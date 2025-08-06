document.addEventListener('DOMContentLoaded', () => {
    const footerTarget = document.getElementById('footer-placeholder');
    let footerFilePath = 'fragments/footer.html';
    if(!isIndex) footerFilePath = '../fragments/footer.html';

    if(footerTarget) {
        fetch(footerFilePath)
            .then(res => res.text())
            .then(html => {
                footerTarget.innerHTML = html;
            });
    }
});