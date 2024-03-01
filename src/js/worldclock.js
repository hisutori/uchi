'use strict';

const updateTimezones = (locale, itemsList) => {
    for (const item of itemsList) {
        let timezone = item.getAttribute('data-timezone');

        const time = new Intl.DateTimeFormat(locale, {
            timeStyle: 'short',
            timeZone: timezone,
        });

        timezone = timezone.split('/')[1].replace('_', ' ');
        item.textContent = `${timezone} ${time.format(new Date())}`;
    }

    setTimeout(updateTimezones.bind(null, locale, itemsList), 1000 * 60);
};

// Main
const locale = Intl.NumberFormat().resolvedOptions().locale;
const items = document.querySelectorAll('main li[data-timezone]');

updateTimezones(locale, items);
