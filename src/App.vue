<template>
    <div id="app">
        <!-- <keep-alive > -->
 <router-view />
        <!-- </keep-alive> -->
    </div>
</template>
<script>
export default {
    name: 'App'
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
}

@font-face {
    font-family: AudiTypeExtended;

    src: url("./assets/fonts/DFPHeiW5-GB.TTF");
    url: url("./assets/fonts/DFPHeiW5-GB.TTF");
}

@font-face {
    font-family: AudiTypeExtended;
    src: url("./assets/fonts/AudiTypeV01-ExtendedNormal.otf");
    url: url("./assets/fonts/AudiTypeV01-ExtendedNormal.otf");
}

html,
body {
    height: 100%;
    background: #f2f2f2;
}

#app {
    height: 100%;
    font-family: AudiTypeExtended, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

button,
el-button {
    border-radius: 0 !important;
}

.page {
    position: relative;
    overflow: auto;
}

.el-message-box {
    width: 80% !important;
    max-width: 375px;
}

.el-message {
    max-width: 300px !important;
    min-width: 280px !important;
}

.el-message-box .el-button--primary {
    background: #000 !important;
    border: 000 !important;
}

.el-dialog {
    width: 90% !important;
}

.el-input__inner {
    border-radius: 0 !important;
}

@media screen and (max-width: 768px) {}
html, body, #app, #app * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
}
input, textarea, [contenteditable="true"] {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    -webkit-touch-callout: default;
}
</style>