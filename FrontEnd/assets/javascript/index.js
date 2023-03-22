// Recovery of all jobs
function getAllWorks() {
    fetch("http://localhost:5678/api/works")
        .then(res => {
            if (res.ok) {
                res.json().then(result => {
                    console.log(result);
                });
            }
            
        }); 
}

getAllWorks();