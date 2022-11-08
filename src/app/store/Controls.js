const { atom } = require("recoil");

export const openMessage = atom({
    key: 'openMessage',
    default: { isOpen: false, message: '', type: '' }
})