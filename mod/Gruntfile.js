module.exports = function(grunt) {
    grunt.initConfig({
        // 提取依赖
        transport: {
            mod: {
                options: {
                    format: 'dist/{{filename}}' // 模块的 id 格式
                },
                files: [{
                    cwd: 'assets/mods',    // 相对路径
                    src: ['**/*.js'], // 需要提取依赖的文件
                    dest: '.build' // 提取后存放的临时文件夹
                }]
            }
        },
        // 合并
        concat: {
            mod: {
                options: {
                    include : 'all'
                },
                files: [
                    {
                        expand: true,
                        cwd: '.build/', // 需要合并的文件夹路径
                        src: ['**/*.js'], // 需要合并的文件
                        dest: 'dist/mods/', // 合并后存放的路径
                        ext: '.js' // 合并后的扩展名
                    }
                ]
            }
        },
        // 压缩
        uglify: {
            mod: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/', // 需要压缩的文件夹路径
                        src: ['**/*.js'], // 需要压缩的文件
                        dest: 'dist/', // 压缩后存放的路径
                        ext: '.js' // 压缩后的扩展名
                    }
                ]
            }
        },
        // 清除临时文件
        clean: {
            mod: ['.build'] // 需要清除的文件夹名称
        }
    });
    
    // 所依赖的组件 S
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // 所依赖的组件 E

    grunt.registerTask('build', ['transport', 'concat', 'clean']); // 创建任务，第一个参数为任务名，后续的数组中为分别要执行的任务。
}
