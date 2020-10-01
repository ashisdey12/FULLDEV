const dogOutput = document.getElementById('output');
const query = document.getElementById('dog_breed');
const form = document.getElementById('form-control');
const loading = document.getElementById('loading');

function showLoading() {
  loading.style.display = 'block';
}

function hideLoading() {
  loading.style.display = 'none';
}

function clearState() {
  dogOutput.innerHTML = '';
}

async function getDogData(e) {
  e.preventDefault();
  try {
    clearState();
    showLoading();
    let start = new Date().getTime();
    const searchTerm = query.value;
    const API_URL = `https://dog.ceo/api/breed/${searchTerm}/images/random/5`;
    const res = await fetch(`${API_URL}`);
    const data = await res.json();
    let end = new Date().getTime();
    let time = end - start;
    console.log(`API Execution Time: ${time} Milliseconds`);
    hideLoading();
    addToDOM(data);
  } catch (error) {
    console.log(error);
  }
}

function addToDOM(data) {
  const div = document.createElement('div');
  div.innerHTML = data.message
    .map(
      (dog) => `
      <div class="container"> 
      <img class="col s6 center-align responsive-img"  src="${dog}" />
        </div>
      `
    )
    .join('');
  dogOutput.appendChild(div);
}
form.addEventListener('submit', getDogData);
