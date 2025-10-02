document.addEventListener("DOMContentLoaded", function ()
{
	const noteContainer = document.getElementById("note-container");
	const newNoteButton = document.getElementById("new-note-button");
	const colorForm = document.getElementById("color-form");
	const colorInput = document.getElementById("color-input");

	// Load the note color from the local storage.
	let noteColor = null; // Stores the selected note color from the form.
    if (localStorage.getItem("noteColor")) 
    {
        noteColor = localStorage.getItem("noteColor");
        // set all notes to this color
    }
    else
    {
        localStorage.setItem("noteColor", "#ffffff"); // initialize to white
    }

	// Load the note ID counter from the local storage.
	let noteIdCounter = 0; // Counter for assigning unique IDs to new notes.
    if (localStorage.getItem("noteIdCounter")) 
    {
        noteIdCounter = parseInt(localStorage.getItem("noteIdCounter"));
    }
    else
    {
        localStorage.setItem("noteIdCounter", noteIdCounter.toString());
    }

	// Load the notes from the local storage.
    // cannot store the entire htmlelement in json;
    // instead storing objects with two key-value pairs, id and value

    if (localStorage.getItem("notes")) 
    {
        let storedNotes = JSON.parse(localStorage.getItem("notes")); // parse string as json to turn back into array
        for (const note of storedNotes) 
        {
            if (note.id && note.value)
            {
                // addNewNote but without adding it to local storage again
                const newNote = document.createElement("textarea");
                newNote.setAttribute("data-note-id", note.id.toString()); // pull id from storage
                newNote.value = note.value; // pull note contents from storage
                newNote.className = "note"; // everything else is the same for all notes
                newNote.style.backgroundColor = noteColor;
                noteContainer.appendChild(newNote);
            }
        }
    }
    else
    {
        localStorage.setItem("notes", JSON.stringify([])); // initialize empty notes array
    }

	function addNewNote ()
	{
		const id = noteIdCounter;
		const content = `Note ${id}`;

		const note = document.createElement("textarea");
		note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
		note.value = content; // Sets the note ID as value.
		note.className = "note"; // Sets a CSS class.
		note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
		noteContainer.appendChild(note); // Appends it to the note container element as its child.

		noteIdCounter++; // Increments the counter since the ID is used for this note.

		// Add new note to the saved notes in the local storage.
        // grab stored notes array
        let storedNotes = JSON.parse(localStorage.getItem("notes"));
        // add a new note object to array
        storedNotes.push( { "id": note.getAttribute("data-note-id"), "value": note.value } );
        // put back into local storage
        localStorage.setItem("notes", JSON.stringify(storedNotes));

        // update id in storage
        localStorage.setItem("noteIdCounter", noteIdCounter.toString());
	}

	colorForm.addEventListener("submit", function (event)
	{
		event.preventDefault(); // Prevents the default event.

		const newColor = colorInput.value.trim();  // Removes whitespaces.

		const notes = document.querySelectorAll(".note");
		for (const note of notes)
		{
			note.style.backgroundColor = newColor;
		}

		colorInput.value = ""; // Clears the color input field after from submission.

		noteColor = newColor; // Updates the stored note color with the new selection.

		// Update the note color in the local storage.
        localStorage.setItem("noteColor", noteColor);
	});

	newNoteButton.addEventListener("click", function ()
	{
		addNewNote();
	});

	document.addEventListener("dblclick", function (event)
	{
		if (event.target.classList.contains("note"))
		{
			event.target.remove(); // Removes the clicked note.

			// Delete the note from the saved notes in the local storage.
            // get array of notes from storage
            let storedNotes = JSON.parse(localStorage.getItem("notes"));

            // search for the one with the target's id
            // notes: arrays don't have a built-in way of deleting an item by value;
            // instead, look for the index of that item and splice by index
            
            // because it's an array of objects, I need a special callback function to compare the array's values:
            let found = storedNotes.find((note) => note.id && note.id === event.target.getAttribute("data-note-id"));
            // now, if the note was in the array, found is equal to the note object to delete
            // I can get the index of the note:
            let foundIndex = storedNotes.indexOf(found);
            if (foundIndex > -1) storedNotes.splice(foundIndex, 1);
            // update in storage
            localStorage.setItem("notes", JSON.stringify(storedNotes));
		}
	});

	noteContainer.addEventListener("blur", function (event)
	{
		if (event.target.classList.contains("note"))
		{
			// Update the note from the saved notes in the local storage.
            // when the client finishes typing into the note and clicks off of it, save its new value
            let storedNotes = JSON.parse(localStorage.getItem("notes"));
            let found = storedNotes.find((note) => note.id && note.id === event.target.getAttribute("data-note-id"));
            // notes: because found is now a reference to an item in storedNotes, 
            // if I change found it will update it in the array instead of making a copy
            found.value = event.target.value;
            localStorage.setItem("notes", JSON.stringify(storedNotes));
		}
	}, true);

	window.addEventListener("keydown", function (event)
	{
		/* Ignores key presses made for color and note content inputs. */
		if (event.target.id === "color-input" || event.target.type === "textarea")
		{
			return;
		}

		/* Adds a new note when the "n" key is pressed. */
		if (event.key === "n" || event.key === "N")
		{
			addNewNote(); // Adds a new note.
		}
	});
});
