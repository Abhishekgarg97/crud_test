$("#add_user").submit(function (event) {
    alert("Data Inserted Successfully!");
});

// const form = document.getElementById("add_user");
// const username = document.getElementById("username");
// const email = document.getElementById("email");
// const number = document.getElementById("number");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     checkInputs();
// });
// console.log("checkInputs()");

// function checkInputs() {
//     // trim to remove the whitespaces
//     const usernameValue = username.value.trim();
//     const emailValue = email.value.trim();
//     const numberValue = number.value.trim();

//     if (usernameValue === "") {
//         setErrorFor(username, "Username cannot be blank");
//     } else {
//         setSuccessFor(username);
//     }

//     if (emailValue === "") {
//         setErrorFor(email, "Email cannot be blank");
//     } else if (!isEmail(emailValue)) {
//         setErrorFor(email, "Not a valid email");
//     } else {
//         setSuccessFor(email);
//     }

//     if (numberValue === "") {
//         setErrorFor(number, "number cannot be blank");
//     } else {
//         setSuccessFor(number);
//     }
//     alert("Data Inserted Successfully!");
// }

// function setErrorFor(input, message) {
//     const formGroup = input.parentElement;
//     const small = formGroup.querySelector("small");
//     formGroup.className = "form-group error";
//     small.innerText = message;
// }

// function setSuccessFor(input) {
//     const formGroup = input.parentElement;
//     formGroup.className = "form-group success";
// }

// function isEmail(email) {
//     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//         email
//     );
// }

$("#update_user").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function (n, i) {
        data[n["name"]] = n["value"];
    });

    var request = {
        url: `http://localhost:3000/api/users/${data.id}`,
        method: "PUT",
        data: data,
    };

    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully!");
    });
});

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id");

        var request = {
            url: `http://localhost:3000/api/users/${id}`,
            method: "DELETE",
        };

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted Successfully!");
                location.reload();
            });
        }
    });
}
