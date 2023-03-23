const svg1 = document.querySelector('.svg_1');
const path1 = svg1.querySelector('path');

console.log(path1.getAttribute('d'));

let count = 10;
svg1.addEventListener('click', ()=> {

    path1.setAttribute('d', `M 20 60 Q ${45 + count} ${10 + count} 85 190`);
    count += 5;
})