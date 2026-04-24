const axios = require('axios');
const prisma = require('../../config/prisma');

const HackathonStatus = Object.freeze({
    UPCOMING: 'UPCOMING',
    ONGOING: 'ONGOING',
    ENDED: 'ENDED'
});

const mapDevpostStatus = (status) => {
    switch (status?.toLowerCase()) {
        case 'upcoming':
            return HackathonStatus.UPCOMING;
        case 'open':
            return HackathonStatus.ONGOING;
        case 'ended':
            return HackathonStatus.ENDED;
        default:
            return HackathonStatus.UPCOMING; // default to upcoming if unknown
    }
};

const collectDevpostHackathons = async () => {
    let page = 0;
    const maxPages = 2;
    while (page <= maxPages) {
        try {
            const { data } = await axios.get(`https://devpost.com/api/hackathons?page=${page}`);
            if (!data.hackathons || data.hackathons.length === 0) {
                console.log('No more hackathons found, stopping scraper.');
                break;
            };
            let endedStatus = false;
            for (const hack of data.hackathons) {
                const slug = hack.submission_gallery_url?.split("//")[1]?.split(".")[0] || null;
                // prize amount
                const rawPrize = hack.prize_amount || "";
                const prizeAmount = parseFloat(rawPrize.replace(/[^0-9.]/g, '')) || 0;
                const currentStatus = mapDevpostStatus(hack.open_state);
                if (currentStatus === HackathonStatus.ENDED) {
                    endedStatus = true;
                    break;
                }
                // themes
                const themeNames = hack.themes?.map(t => t.name) || [];
                const tagsData = themeNames.map(name => ({
                    tag: {
                        connectOrCreate: {
                            where: { name: name },
                            create: { name: name }
                        }
                    }
                }));
                
                await prisma.hackathon.upsert({
                    where: { id: hack.id.toString() },
                    update: {
                        status: currentStatus,
                        remainingTime: hack.time_left_to_submission,
                        submissionPeriod: hack.submission_period_dates,
                        registrationsCount: hack.registrations_count,
                    },
                    create: {
                        id: hack.id.toString(),
                        slug: slug,
                        title: hack.title,
                        status: currentStatus,
                        applyLink: hack.url,
                        thumbnailUrl: hack.thumbnail_url,
                        tags: {
                            create: tagsData
                        },
                        location: hack.displayed_location?.location || "Online",
                        remainingTime: hack.time_left_to_submission,
                        submissionPeriod: hack.submission_period_dates,
                        prizeAmount: prizeAmount,
                        prizesCounts: hack.prizes_counts?.cash || 0,
                        registrationsCount: hack.registrations_count,
                        organization: hack.organization_name
                    },
                });
            }
            if(endedStatus) break; // stop if we hit ended hackathons
            page++;
            await new Promise(res => setTimeout(res, 1000));
        } catch (error) {
            console.error('Scraper Error (DevPost):', error.message);
            break;
        }
    }
};

module.exports = { collectDevpostHackathons };
