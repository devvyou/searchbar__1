const input = document.querySelector('form #product');
const ul = document.querySelector('ul');

input.addEventListener('keyup', async () => {

    const value = input.value;

    try {

        const fetchObj = await fetch('/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload: value })
        })

        const data = await fetchObj.json();

        ul.innerHTML = '';

        if (data.length <= 0 || data.length === undefined || data.length == undefined) {

            const li = document.createElement('li');
            li.innerText = 'Nothing was found';
            ul.append(li);

        } else {

            data.forEach(product => {
                const li = document.createElement('li');
                li.innerText = product.productName;
                ul.append(li);
            })

        }

    } catch (error) {
        throw new Error(error);
    }


})