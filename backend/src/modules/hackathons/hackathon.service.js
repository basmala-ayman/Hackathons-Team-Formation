const axios = require('axios');
const prisma = require('../../config/prisma');

const collectHackathonsDevpost = async () => {
    let page = 0;
    const maxPages = 20;
    while (page <= maxPages) {
        try {
            const { data } = await axios.get(`https://devpost.com/api/hackathons?page=${page}`);
            if (!data.hackathons || data.hackathons.length === 0) break;

            for (const hack of data.hackathons) {
                const slug = hack.submission_gallery_url?.split("//")[1]?.split(".")[0] || null;
                // prize amount
                const rawPrize = hack.prize_amount || "";
                const prizeAmount = parseFloat(rawPrize.replace(/[^0-9.]/g, '')) || 0;

                await prisma.hackathon.upsert({
                    where: { id: hack.id.toString() },
                    update: {
                        status: hack.open_state,
                        remainingTime: hack.time_left_to_submission,
                        submissionPeriod: hack.submission_period_dates,
                        registrationsCount: hack.registrations_count,
                    },
                    create: {
                        id: hack.id.toString(),
                        slug: slug,
                        title: hack.title,
                        status: hack.open_state,
                        applyLink: hack.url,
                        tags: hack.themes?.map(t => t.name) || [],
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

module.exports = { collectHackathonsDevpost };