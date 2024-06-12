const tableBody = document.getElementById('tableBody');
        const myButton = document.getElementById('createExpenseBtn');

        function updateButtonContent() {
            if (window.innerWidth <= 320) {
                myButton.textContent = '+';
            }
            else {
                myButton.textContent = '+ New Expense';
            }
        }

        // Initial content update on page load
        updateButtonContent();

        // Add an event listener for the resize event
        window.addEventListener('resize', updateButtonContent);
        // Sample data
        const data = [

            // {
            //     name: 'Expense 1',
            //     category: 'Food',
            //     dateOfExpense: '2023-01-01',
            //     amount: '20',
            //     updatedAt: '2023-01-02',
            //     createdBy: 'John Doe',
            // },
            // {
            //     name: 'Expense 2',
            //     category: 'Travel',
            //     dateOfExpense: '2023-02-05',
            //     amount: '100',
            //     updatedAt: '2023-02-06',
            //     createdBy: 'Jane Smith',
            // },
            // {
            //     name: 'Expense 3',
            //     category: 'Utilities',
            //     dateOfExpense: '2023-03-10',
            //     amount: '50',
            //     updatedAt: '2023-03-12',
            //     createdBy: 'Alice Johnson',
            // },
            // {
            //     name: 'Expense 4',
            //     category: 'Entertainment',
            //     dateOfExpense: '2023-04-15',
            //     amount: '30',
            //     updatedAt: '2023-04-17',
            //     createdBy: 'Bob Williams',
            // },
            // {
            //     name: 'Expense 5',
            //     category: 'Transportation',
            //     dateOfExpense: '2023-05-20',
            //     amount: '40',
            //     updatedAt: '2023-05-22',
            //     createdBy: 'Eve Brown',
            // },
            // {
            //     name: 'Expense 6',
            //     category: 'Shopping',
            //     dateOfExpense: '2023-06-25',
            //     amount: '60',
            //     updatedAt: '2023-06-27',
            //     createdBy: 'Charlie Davis',
            // },
            // {
            //     name: 'Expense 7',
            //     category: 'Food',
            //     dateOfExpense: '2023-07-30',
            //     amount: '25',
            //     updatedAt: '2023-07-31',
            //     createdBy: 'Grace Lee',
            // },
            // {
            //     name: 'Expense 8',
            //     category: 'Travel',
            //     dateOfExpense: '2023-08-03',
            //     amount: '90',
            //     updatedAt: '2023-08-04',
            //     createdBy: 'David Wilson',
            // },
        ];

        let editingIndex = -1; // Initialize with -1 to indicate no item is being edited initially


        const overlay = document.getElementById('overlay');
        const createExpenseDiv = document.getElementById('create_expense_div');

        const overlayDeleteHolder = document.getElementById('overlayDeleteHolder');
        overlayDeleteHolder.style.display = 'none';

        // Function to show the popup and overlay
        function showPopup() {
            overlay.style.display = 'block';
            createExpenseDiv.style.display = 'block';
        }

        // Function to hide the popup and overlay
        function hidePopup() {
            overlay.style.display = 'none';
            createExpenseDiv.style.display = 'none';
        }

        function showDeletPopup() {
            overlayDeleteHolder.style.display = 'block';
        }
        function hideDeletPopup() {
            overlayDeleteHolder.style.display = 'none';
        }


        document.getElementById('close_icon').addEventListener('click', () => {
            hidePopup();
        });


        // Initialize variables and functions for displaying data and pagination
        let currentPage = 1;
        const rowsPerPage = 6;








        // Function to get the current date and time in a 'YYYY-MM-DD HH:MM:SS' format
        function getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        // function getCurrentDateTime() {
        //     const now = new Date();
        //     const options = {
        //         year: 'numeric',
        //         month: 'short',
        //         day: '2-digit',
        //         hour: '2-digit',
        //         minute: '2-digit',
        //         second: '2-digit',
        //         hour12: true, // Use 12-hour time format
        //     };
        //     return now.toLocaleString('en-US', options);
        // }


        // Event handler for the "Edit" button
        function handleEditButtonClick(event) {
            const index = event.target.getAttribute('data-index');
            editingIndex = index; // Set the editing index
            const itemToEdit = data[index];

            // Populate the form fields with data from the selected row
            document.getElementById('ExpenseName').value = itemToEdit.name;
            document.getElementById('category_select').value = itemToEdit.category;
            document.getElementById('local_time').value = itemToEdit.dateOfExpense;
            document.getElementById('ExpenseAmount').value = itemToEdit.amount;
            document.getElementById('createdBy').value = itemToEdit.createdBy;

            // Display the form for editing
            showPopup();

            // Prevent the creation of a new row on save
            event.stopPropagation();
        }


        // Event handler for the "Delete" button
        function handleDeleteButtonClick(event) {
            const index = event.target.getAttribute('data-index');
            // Handle delete action for the selected item (data[index])
            // You can prompt for confirmation and remove the item from the data array here
            data.splice(index, 1);
            displayData(); // Refresh the table after deletion
            createPagination(); // Refresh pagination
        }





        function displayData() {
            // Clear the table body
            tableBody.innerHTML = '';

            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            const displayedData = data.slice(startIndex, endIndex);

            displayedData.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.dateOfExpense}</td>
            <td>₹${item.amount}</td>
            <td>${item.createdBy}</td>
            <td>${item.modifiedAt || item.dateOfExpense}</td>
            <td class="edit_delete_buttons">
                <img src="./assets/edit.png" alt="edit" class="edit-button" data-index="${index + startIndex}">
                <img src="./assets/delete.png" alt="delete" class="delete-button" data-index="${index + startIndex}">
            </td>
        `;
                tableBody.appendChild(row);
            });

            const editButtons = document.querySelectorAll('.edit-button');
            const deleteButtons = document.querySelectorAll('.delete-button');

            editButtons.forEach(button => {
                document.getElementById('createExpensePop').style.display = 'none';
                document.getElementById('updateExpensePop').style.display = 'block';
                button.addEventListener('click', handleEditButtonClick);
            });

            deleteButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    // Handle delete confirmation popup here
                    showDeleteConfirmationPopup(event);
                });
            });
        }

        // Function to show the delete confirmation popup
        function showDeleteConfirmationPopup(event) {
            const index = event.target.getAttribute('data-index');
            const itemToDelete = data[index];

            // Show the overlay and delete confirmation popup
            const overlayDeleteHolder = document.getElementById('overlayDeleteHolder');
            overlayDeleteHolder.style.display = 'block';

            // Attach event listeners to "Yes" and "No" buttons
            const noBtn = document.getElementById('noBtn');
            const yesBtn = document.getElementById('yesBtn');

            noBtn.onclick = () => {
                // Hide the delete confirmation popup
                hideDeleteConfirmationPopup();
            };

            yesBtn.onclick = () => {
                // Delete the item from the data array
                data.splice(index, 1);
                // Refresh the table
                displayData();
                // Hide the delete confirmation popup
                hideDeleteConfirmationPopup();
            };
        }

        // Function to hide the delete confirmation popup
        function hideDeleteConfirmationPopup() {
            const overlayDeleteHolder = document.getElementById('overlayDeleteHolder');
            overlayDeleteHolder.style.display = 'none';
        }










        function createPagination() {
            const totalPages = Math.ceil(data.length / rowsPerPage);
            const pagination = document.getElementById('pagination');

            pagination.innerHTML = '';

            for (let i = 1; i <= totalPages; i++) {
                const listItem = document.createElement('li');
                listItem.textContent = i;

                listItem.addEventListener('click', () => {
                    currentPage = i;
                    displayData();
                    createPagination();
                });

                pagination.appendChild(listItem);
            }

            // Add 'selected' class to the current page number
            const currentPageItem = pagination.querySelector(`li:nth-child(${currentPage})`);
            if (currentPageItem) {
                currentPageItem.classList.add('selectedPageNumber');
            }
        }



        // Event handler for the "Update Expense" button
        document.getElementById('updateExpensePop').addEventListener('click', () => {
            // Get the data from the form
            const newExpenseName = document.getElementById('ExpenseName').value;
            const newCategorySelect = document.getElementById('category_select');
            const newLocalTime = document.getElementById('local_time').value;
            const newExpenseAmount = document.getElementById('ExpenseAmount').value;
            const newCreatedBy = document.getElementById('createdBy').value;

            // Check if the date is empty and use the current date and time if not provided
            const currentDate = newLocalTime;

            if (editingIndex === -1) {
                // Adding a new expense
                const newExpense = {
                    name: newExpenseName,
                    category: newCategorySelect.value || newCategorySelect.options[0].value, // Use the first option if nothing is selected
                    dateOfExpense: currentDate,
                    amount: getCurrentDateTime(),
                    createdBy: newCreatedBy,
                    modifiedAt: getCurrentDateTime(), // Initialize with an empty string for new expenses
                };
                data.push(newExpense);
            } else {
                // Updating an existing expense
                const editedExpense = {
                    name: newExpenseName,
                    category: newCategorySelect.value || newCategorySelect.options[0].value, // Use the first option if nothing is selected
                    dateOfExpense: currentDate,
                    amount: newExpenseAmount,
                    createdBy: newCreatedBy,
                    modifiedAt: getCurrentDateTime(), // Update the modifiedAt property
                };
                data[editingIndex] = editedExpense;
                editingIndex = -1; // Reset editingIndex
            }

            // Clear form fields
            document.getElementById('ExpenseName').value = '';
            newCategorySelect.selectedIndex = 0; // Set the selected index to the first option
            document.getElementById('local_time').value = '';
            document.getElementById('ExpenseAmount').value = '';
            document.getElementById('createdBy').value = '';

            // Close the form
            hidePopup();

            // Update the table
            displayData();
        });





        // Event handlers
        document.getElementById('createExpenseBtn').addEventListener('click', () => {
            document.getElementById('createExpensePop').style.display = 'block';
            document.getElementById('updateExpensePop').style.display = 'none';
            editingIndex = -1; // Reset editingIndex when creating a new expense
            showPopup();
        });






        // Event handler for the "Add Expense" button
        document.getElementById('createExpensePop').addEventListener('click', () => {


            // Get the data from the form
            const newExpenseName = document.getElementById('ExpenseName').value;
            const newCategorySelect = document.getElementById('category_select');
            const newLocalTime = document.getElementById('local_time').value;
            const newExpenseAmount = document.getElementById('ExpenseAmount').value;
            const newCreatedBy = document.getElementById('createdBy').value;

            // Check if the date is empty and use the current date and time if not provided
            const currentDate = newLocalTime || getCurrentDateTime();

            // Create a new expense object
            const newExpense = {
                name: newExpenseName,
                category: newCategorySelect.value || newCategorySelect.options[0].value, // Use the first option if nothing is selected
                dateOfExpense: currentDate,
                amount: newExpenseAmount,
                createdBy: newCreatedBy,
            };

            // Add the new expense to the data array
            data.push(newExpense);

            // Clear form fields
            document.getElementById('ExpenseName').value = '';
            newCategorySelect.selectedIndex = 0; // Set the selected index to the first option
            document.getElementById('local_time').value = '';
            document.getElementById('ExpenseAmount').value = '';
            document.getElementById('createdBy').value = '';

            // Close the form
            hidePopup();

            // Update the table and pagination
            displayData();
            createPagination();

            // Scroll to the last page (last index of pagination)
            const totalPages = Math.ceil(data.length / rowsPerPage);
            currentPage = totalPages;
            createPagination();

            // Trigger a click event on the last pagination item
            const lastPaginationItem = document.querySelector(`#pagination li:last-child`);
            if (lastPaginationItem) {
                lastPaginationItem.click();
            }


        });


        // Initial display
        displayData();
        createPagination();





        // fav icon code for changing the icons on every 5 seconds
        function changeFavicon() {
            const faviconElement = document.getElementById('favicon');
            const currentFavicon = faviconElement.getAttribute('href');
            const faviconBaseName = './assets/logo'; // Update this to match your favicon filenames
            const totalFavicons = 5; // Update this to match the number of favicon images
          
            let currentFaviconIndex = parseInt(currentFavicon.replace(faviconBaseName, '').replace('.png', ''));
          
            // Increment the favicon index and wrap around if necessary
            currentFaviconIndex = (currentFaviconIndex % totalFavicons) + 1;
          
            // Set the new favicon
            const newFavicon = `${faviconBaseName}${currentFaviconIndex}.png`;
            faviconElement.setAttribute('href', newFavicon);
          }
          
          // Change the favicon every 5 seconds (5000 milliseconds)
          setInterval(changeFavicon, 5000);
          