declare const chrome: any;

export const NAVBAR_HREF = '#radarr-sonarr';

const insertIntoPlexNavbar = () => {
    if (!document) {
        return;
    }

    const navbar: any = document.querySelector('.nav-bar-right');

    if (!navbar || navbar.querySelector('.radarr-sonarr-btn')) {
        return;
    }

    const activityBtn = navbar.querySelector('.activity-btn');

    if (!activityBtn) {
        return;
    }

    const existingBtn = activityBtn.parentNode;

    if (!existingBtn) {
        return;
    }

    const btn: any = existingBtn.cloneNode(true);

    if (!btn) {
        return;
    }

    btn.classList.remove('active');

    const link = btn.querySelector('a');
    link.setAttribute('class', 'radarr-sonarr-btn');
    link.setAttribute('href', NAVBAR_HREF);
    link.setAttribute('title', 'Radarr & Sonarr');
    link.style.marginTop = '-3px';
    link.querySelector('span').remove();

    const icon = link.querySelector('i');
    const svg = document.createElement('img');
    if (chrome && chrome.extension) {
        svg.setAttribute('src', chrome.extension.getURL('img/icon256_grayscaled.png'));
        link.replaceChild(svg, icon);
    }
    svg.setAttribute('width', '26');

    navbar.insertBefore(btn, existingBtn);
};

export default insertIntoPlexNavbar;