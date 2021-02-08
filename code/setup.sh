# Setup tinyMCE
npm install tinymce
cp node_modules/tinymce static/ -r
# Setup Nodes modules and builds
npm install
cd website/control/
npm install
ng build --prod
cd ../public
npm install
ng build --prod
