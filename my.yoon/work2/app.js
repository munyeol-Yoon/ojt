async function getJSONData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');

    return await response.json();
  } catch (error) {
    console.error('⛔️', error);
    throw error;
  }
}

function createHeaderRow() {
  const headerRow = document.createElement('tr');
  const headers = ['userId', 'id', 'title', 'completed', 'none'];
  
  headers.forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  
  return headerRow;
}

function createDataRow(item) {
  const row = document.createElement('tr');
  const values = [item.userId, item.id, item.title, item.completed, '-'];
  
  values.forEach(value => {
    const td = document.createElement('td');
    td.textContent = value;
    row.appendChild(td);
  });
  
  return row;
}

async function initialize() {
  const data = await getJSONData();
  const root = document.querySelector('#root');
  
  const header = document.createElement('header');
  const refreshButton = document.createElement('button');
  refreshButton.textContent = 'Refresh';
  header.appendChild(refreshButton);
  
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  
  thead.appendChild(createHeaderRow());
  data.forEach(item => tbody.appendChild(createDataRow(item)));
  
  table.appendChild(thead);
  table.appendChild(tbody);
  
  root.appendChild(header);
  root.appendChild(table);

  refreshButton.addEventListener('click', async () => {
    try {
      tbody.innerHTML = '';
      const newData = await getJSONData();
      newData.forEach(item => tbody.appendChild(createDataRow(item)));
    } catch (error) {
      console.error('⛔️', error);
    }
  });
}

initialize()