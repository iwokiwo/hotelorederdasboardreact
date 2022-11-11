const { atom } = require("recoil");

export const urlUnit = atom({
    key: 'urlUnit',
    default: "/api/v1/front/unit"
})

export const urlCategory = atom({
    key: 'urlCategory',
    default: {title: '', openPopup: false, size: 'sm'}
})