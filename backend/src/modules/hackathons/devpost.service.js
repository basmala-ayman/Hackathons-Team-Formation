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
    const maxPages = 4;
    while (page <= maxPages) {
        try {
            const { data } = await axios.get(`https://devpost.com/api/hackathons?page=${page}`);
            if (!data.hackathons || data.hackathons.length === 0) break;

            for (const hack of data.hackathons) {
                const slug = hack.submission_gallery_url?.split("//")[1]?.split(".")[0] || null;
                // prize amount
                const rawPrize = hack.prize_amount || "";
                const prizeAmount = parseFloat(rawPrize.replace(/[^0-9.]/g, '')) || 0;
                const currentStatus = mapDevpostStatus(hack.open_state);

              //check if hackathon ended 
                const endDate = hack.submission_period_dates?.end
                    ? new Date(hack.submission_period_dates.end)
                    : null;

                let finalStatus = currentStatus;

                if (endDate && endDate < new Date()) {
                    finalStatus = HackathonStatus.ENDED;
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
                    where: { devpostId: hack.id.toString() },
                    update: {
                        // status: currentStatus,
                        status: finalStatus,
                        remainingTime: hack.time_left_to_submission,
                        submissionPeriod: hack.submission_period_dates,
                        registrationsCount: hack.registrations_count,
                    },
                    create: {
                        devpostId: hack.id.toString(),
                        slug: slug,
                        title: hack.title,
                        // status: currentStatus,
                        status: finalStatus,
                        applyLink: hack.url,
                        // thumbnailUrl: hack.thumbnail_url,
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
            page++;
            await new Promise(res => setTimeout(res, 1000));
        } catch (error) {
            console.error('Scraper Error (DevPost):', error.message);
            break;
        }
    }
};

module.exports = { collectDevpostHackathons };
