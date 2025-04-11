if (typeof auth !== 'undefined') {
    var viewsCollection = db.collection('views');
    var likesCollection = db.collection('likes');

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function toggleLoaders(node){
        var classesString = node.className;
        if(classesString == "") return
        var classes = classesString.split(" ");
        for(var i in classes){  
            node.classList.toggle(classes[i])
        }
    }

    var update_views = function (node, id) {
        viewsCollection.doc(id).onSnapshot(doc => {
            var data = doc.data();
            if (data) {
                node.innerText = "Número de vistas: " + numberWithCommas(data.views)
            } else {
                node.innerText = "Sin vistas."
            }
            toggleLoaders(node)
        })
    }

    var update_likes = function (node, id) {
        likesCollection.doc(id).onSnapshot(doc => {
            var data = doc.data();
            if (data) {
                node.innerText = "Número de me gustas: " + numberWithCommas(data.likes)
            } else {
                node.innerText = "Sin me gustas."
            }
            toggleLoaders(node)

        })
    }


    auth.signInAnonymously()
        .then(() => {
            var views_nodes = document.querySelectorAll("span[id^='views_']")

            for (var i in views_nodes) {
                var node = views_nodes[i]
                var id = node.id ? node.id.replaceAll("/", "-") : node.id
                if (id) {
                    update_views(node, id)
                }
            }

            var likes_nodes = document.querySelectorAll("span[id^='likes_']")

            for (var i in likes_nodes) {
                var node = likes_nodes[i]
                var id = node.id ? node.id.replaceAll("/", "-") : node.id
                if (id) {
                    update_likes(node, id)
                }
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode, errorMessage)
        });
}