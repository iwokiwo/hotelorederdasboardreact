const { atom } = require("recoil");

export const openMessage = atom({
    key: 'openMessage',
    default: { isOpen: false, message: '', type: '' }
})

export const popupState = atom({
    key: 'popupState',
    default: {title: '', openPopup: false, size: 'sm'}
})

export const confirmDialogState = atom({
    key: 'confirmDialogState',
    default: { isOpen: false, title: '', subTitle: '' }
})

export const reload = atom({
    key: 'reload-state',
    default: ''
})