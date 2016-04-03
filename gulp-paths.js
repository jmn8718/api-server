//define paths
var basePaths = {
    src: 'app/',
    dest: 'public/',
}

var paths = {
    images: {
        src : basePaths.src + 'images/',
        dest: basePaths.dest + 'images/',
    },
    javascripts: {
        src : basePaths.src + 'js/',
        dest: basePaths.dest + 'javascripts/',
    },
    styles: {
        src : basePaths.src + 'scss/',
        dest: basePaths.dest + 'stylesheets/',
    },
    // sprites: {
    //     src : basePaths.src + 'images/',
    //     dest: basePaths.dest + 'images/',
    // },
}

module.exports = paths;