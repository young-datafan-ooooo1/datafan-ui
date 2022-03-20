#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'ui.young-datafan.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:young-datafan/datafan-ui.git master:gh-pages

cd -
