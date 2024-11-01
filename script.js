document.addEventListener("DOMContentLoaded", function() {
    const gridRowContainer = document.getElementById("grid-row-container");
  
    for (let row = 0; row < 6; row++) {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("grid-row");
  
      const rowControl = document.createElement("div");
      rowControl.classList.add("row-control");
  
      // Botón para cargar imágenes en la fila
      const loadRowButton = document.createElement("button");
      loadRowButton.textContent = `Cargar Fila ${row + 1}`;
      loadRowButton.onclick = () => loadImageInRow(row);
  
      // Botón para eliminar imágenes en la fila
      const clearRowButton = document.createElement("button");
      clearRowButton.textContent = `Eliminar Fila ${row + 1}`;
      clearRowButton.onclick = () => clearImagesInRow(row);
  
      rowControl.appendChild(loadRowButton);
      rowControl.appendChild(clearRowButton);
      rowContainer.appendChild(rowControl);
  
      const gridRow = document.createElement("div");
      gridRow.classList.add("grid");
  
      for (let col = 0; col < 7; col++) {
        const index = row * 7 + col;
        const imageBox = document.createElement("div");
        imageBox.classList.add("image-box");
  
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept = "image/*";
        inputFile.onchange = (event) => loadImage(event, index);
  
        const img = document.createElement("img");
        img.id = `img${index}`;
        img.alt = "Imagen cargada";
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = () => removeImage(index);
  
        imageBox.appendChild(inputFile);
        imageBox.appendChild(img);
        imageBox.appendChild(deleteButton);
        gridRow.appendChild(imageBox);
      }
  
      rowContainer.appendChild(gridRow);
      gridRowContainer.appendChild(rowContainer);
    }
  
    const loadAllButton = document.createElement("button");
    loadAllButton.textContent = "Cargar en cuadros vacíos";
    loadAllButton.onclick = () => {
      const globalInput = document.createElement("input");
      globalInput.type = "file";
      globalInput.accept = "image/*";
      globalInput.onchange = loadImageInEmptyCells;
      globalInput.click();
    };
    document.body.appendChild(loadAllButton);
  
    const clearAllButton = document.createElement("button");
    clearAllButton.textContent = "Vaciar todos los cuadros";
    clearAllButton.onclick = clearAllImages;
    document.body.appendChild(clearAllButton);
  
    // Botón de imprimir
    const printButton = document.getElementById("printButton");
    printButton.onclick = () => window.print();
  });
  
  // Resto de funciones como loadImage, loadImageInEmptyCells, removeImage, clearAllImages, loadImageInRow, clearImagesInRow...
  
  
  function loadImage(event, index) {
    const img = document.getElementById(`img${index}`);
    img.src = URL.createObjectURL(event.target.files[0]);
    img.style.display = "block";
  }
  
  function loadImageInEmptyCells(event) {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    for (let i = 0; i < 42; i++) {
      const img = document.getElementById(`img${i}`);
      if (img.style.display === "none" || !img.src) {
        img.src = imageUrl;
        img.style.display = "block";
      }
    }
  }
  
  function removeImage(index) {
    const img = document.getElementById(`img${index}`);
    img.src = "";
    img.style.display = "none";
  }
  
  function clearAllImages() {
    for (let i = 0; i < 42; i++) {
      const img = document.getElementById(`img${i}`);
      img.src = "";
      img.style.display = "none";
    }
  }
  
  function loadImageInRow(row) {
    const globalInput = document.createElement("input");
    globalInput.type = "file";
    globalInput.accept = "image/*";
    globalInput.onchange = (event) => {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      for (let col = 0; col < 7; col++) {
        const index = row * 7 + col;
        const img = document.getElementById(`img${index}`);
        if (img.style.display === "none" || !img.src) {
          img.src = imageUrl;
          img.style.display = "block";
        }
      }
    };
    globalInput.click();
  }
  
  function clearImagesInRow(row) {
    for (let col = 0; col < 7; col++) {
      const index = row * 7 + col;
      const img = document.getElementById(`img${index}`);
      img.src = "";
      img.style.display = "none";
    }
  }
  