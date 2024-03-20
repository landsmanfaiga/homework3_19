$(() => {

    const addModal = new bootstrap.Modal($('#add-modal')[0]);
    const editModal = new bootstrap.Modal($('#edit-modal')[0]);


    function loadPeople() {
        $.get('/home/getpeople', function (people) {
            $("tbody tr").remove();
            people.forEach(person => {
                $("tbody").append(`
<tr>
    <td>${person.id}</td>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td> 
    <button class="btn btn-danger" id="delete" data-personid="${person.id}">Delete</button>
    </td>
    <td>
    <button class="btn btn-primary" id="edit" data-personid2="${person.id}">Edit</button>
    </td>
</tr>
`);
            });
        });
    }

    loadPeople();

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        addModal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            addModal.hide();
            loadPeople();
        });


    });

    $("#table").on('click', "#delete", function () {
        const id = $(this).data('personid');
        $.post(`/home/deleteperson?id=${id}`, function () {
            loadPeople();
        });

    });

    $("#table").on('click', "#edit", function () {
        const id = $(this).data('personid2');

        $.post(`/home/getperson?id=${id}`, function (person) {     
            $("#firstName2").val(`${person.firstName}`);
            $("#lastName2").val(`${person.lastName}`);
            $("#age2").val(`${person.age}`);
            $("#id").val(`${person.id}`)
            editModal.show();
        });
    });

    $("#save-person2").on('click', function () {
        const person = {
           id: $("#id").val(),
           firstName: $("#firstName2").val(),
           lastName: $("#lastName2").val(),
           age: $("#age2").val()

        }
       

        $.post('/home/editperson', person, function () {
            editModal.hide();
            loadPeople();
        });
    });

});
