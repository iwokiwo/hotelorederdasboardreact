const { atom } = require("recoil");

export const openMessage = atom({
    key: 'openMessage',
    default: { isOpen: false, message: '', type: '' }
})

export const popupState = atom({
    key: 'popupState',
    default: {title: '', openPopup: false, size: 'sm'}
})