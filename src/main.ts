/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let popup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.ui.registerMenuCommand('Menu test',
    {
    callback: () => {
        WA.chat.sendChatMessage('registerMenuCommand Menu test');
    }
    })

    WA.room.area.onEnter('btnicon').subscribe(() => {
        WA.ui.actionBar.addButton({
            // @ts-ignore
            id: 'help-btn',
            // @ts-ignore
            type: 'action',
            imageSrc: 'https://svgur.com/i/10Sh.svg',
            toolTip: 'Test BTN 1',
            callback: () => {
                WA.nav.openCoWebSite("https://hugoaverty.github.io/eiffage-UI/src/help.pdf");
            }
        });
    })
    
    WA.room.area.onEnter('btntext').subscribe(() => {
        WA.ui.actionBar.addButton({
            // @ts-ignore
            id: 'text-btn',
            label: 'Button test',
            // @ts-ignore
            callback: (event) => {
                WA.chat.sendChatMessage('Button test');
            }
        });
    })

    
    WA.room.area.onEnter('actionMessage').subscribe(() => {
        WA.ui.displayActionMessage({
            message: "press 'space' to confirm",
            callback: () => {
                WA.chat.sendChatMessage("confirmed", "trigger message logic")
            }
        });
    })

    WA.room.area.onEnter('banner').subscribe(() => {
        WA.ui.banner.openBanner({
            // @ts-ignore
            id: 'banner-test',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            bgColor: "rgb(65, 86, 246)",
            textColor: "#ffffff",
            closable: true,
            timeToClose: 120000,
            link: {
                label: "Button exemple",
                url: "https://workadventu.re"
            }
        });
        WA.ui.banner.openBanner({
            // @ts-ignore
            id: 'banner-test2',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            bgColor: "rgb(65, 86, 246)",
            textColor: "#ffffff",
            closable: true,
            timeToClose: 120000,
            link: {
                label: "Button exemple",
                url: "https://workadventu.re"
            }
        });
    })

    WA.room.area.onEnter('popupZone').subscribe(() => {
        popup = WA.ui.openPopup("popup", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    })

    WA.room.area.onLeave('popupZone').subscribe(closePopup);

    WA.room.area.onEnter('popupWide').subscribe(() => {
        WA.ui.modal.openModal({
            src: "https://hugoaverty.github.io/eiffage-UI/src/",
            allow: "fullscreen",
            title: "Bienvenue",
            allowApi: true,
            position: "center",
        });
    })

    WA.room.area.onLeave('popupWide').subscribe(() => {
        WA.ui.modal.closeModal();
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));



}).catch(e => console.error(e));

function closePopup(){
    if (popup !== undefined) {
        popup.close();
        popup = undefined;
    }
}


export {};
