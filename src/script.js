import baffle from 'baffle'

let b = baffle(document.querySelectorAll('.baffle'))

b.start().set({ speed: 50 }).reveal(1000)
