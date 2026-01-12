const fields = []

const handleFieldTypeChange = () => {
    const fieldType = document.getElementById("fieldType").value;
    const radioOptions = document.getElementById("radioOptions");
    if(fieldType == "radio"){
        radioOptions.style.display = "flex"
    }
    else
    {
        radioOptions.style.display = "none"
    }
}

const renderTable = (rowInput) => {
    const tableBody = document.getElementById("fieldsTable");
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
    <td>${rowInput.label}</td>
    <td>${rowInput.fieldType}</td>
    <td>${rowInput.radioOptions || "-"}</td>
    <td>${rowInput.isRequired ? "Yes" : "No"}</td> 
    `;

    tableBody.appendChild(tableRow);
}

const addField = () => {
    const label = document.getElementById("label").value;
    const fieldType = document.getElementById("fieldType").value;
    const isRequired = document.getElementById("isRequired").checked;
    const radioOptions = document.getElementById("radioOptionsField")?.value;

    const formFields = {label,fieldType,radioOptions,isRequired};
    renderTable(formFields);
    fields.push(formFields);

    document.getElementById("label").value = "";
    document.getElementById("fieldType").value= "text";
    document.getElementById("isRequired").checked = false;

    if(radioOptions) document.getElementById("radioOptionsField").value = "" ;

    handleFieldTypeChange();
}

const generateCode = () => {
  let htmlCode = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Form</title>

    <style>
    body {
        font-family: Arial, sans-serif;
        margin: 30px;
    }

    h2 {
        margin-bottom: 20px;
    }

    label {
        font-weight: bold;
    }

    input {
        margin-top: 5px;
        margin-bottom: 10px;
    }

    button {
        margin-top: 15px;
        padding: 6px 12px;
        cursor: pointer;
    }
    </style>

    </head>
    <body>

    <h2>Form</h2>

    <form action="/submit" method="post">
    `;

    fields.forEach(element => {
        if (element.fieldType === "radio") {


        htmlCode += `
            <label>${element.label} ${element.isRequired ? "*" : ""}</label>
            <br>
            <br>
        `;

        element.radioOptions.split(",").forEach((opt, index) => {
            htmlCode += `
                <input 
                type="radio" 
                name="${element.label}" 
                value="${opt.trim()}" 
                ${element.isRequired && index === 0 ? "required" : ""}
                > ${opt.trim()}<br>
            `;
        });

        htmlCode += `<br>`;
        } 
        else 
        {
            htmlCode += `
                <label>${element.label} ${element.isRequired ? "*" : ""}</label><br>
                <input 
                type="${element.fieldType}" 
                ${element.isRequired ? "required" : ""}
                >
                <br><br>
            `;
        }
    });

    htmlCode += `
        <button type="submit">Submit</button>
        </form>

        </body>
        </html>
    `;

    document.getElementById("generatedCode").textContent = htmlCode;
};
