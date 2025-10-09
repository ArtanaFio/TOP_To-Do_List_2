import { makeElement } from './DOM_basic_functions';

export function createPageLayout(container) {
    const pageTitle = makeElement('h1', 'document-title', '', 'To-Do List', container);
    const mainContainer = makeElement('div', 'main-container', '', '', container);
    const leftPanel = makeElement('div', 'left-panel', '', '', mainContainer);
    const leftHeading = makeElement('h2', '', 'panel-heading', 'Projects', leftPanel);
    const leftPanelContainer = makeElement('div', '', 'panel-container', '', leftPanel);
    const leftPanelButtonBox = makeElement('div', '', 'button-box', '', leftPanel);
    const addProjectButton = makeElement('button', '', 'add-button', 'Add Project', leftPanelButtonBox);
    const rightPanel = makeElement('div', 'right-panel', '', '', mainContainer);
    const footer = makeElement('footer', '', '', '', document.body);
    const createdByText = makeElement('span', '', 'footer-text', 'Create by ', footer);
    const nameText = makeElement('span', '', 'name-text', 'ArtanaFio', footer);
    const onText = makeElement('span', '', 'footer-text', ' on ', footer);
    const githubLink = makeElement('a', '', 'footer-link', 'GitHub', footer);
    githubLink.href = 'https://github.com/ArtanaFio/';
    githubLink.target = '_blank';
    const copyright = makeElement('span', '', 'footer-text', ' \u00A9', footer);
    const copyrightYear = makeElement('span', '', 'footer-text',` ${new Date().getFullYear()}`, footer);
    copyrightYear.className = 'year';

    return {
        leftPanelContainer: leftPanelContainer,
        rightPanel: rightPanel,
        addProjectButton: addProjectButton
    }
};

