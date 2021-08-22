<template>
  <footer>
    <div class="left">
      <h4>Contact</h4>

      <div>#freeIRC@IRCnet</div>
      <div>#freeIRC@QuakeNet</div>
      <div>freeIRC.cloud@gmail.com</div>
    </div>
    <div class="right">
      <h4>Links</h4>
      <div class="icon-tray">
        <a href="https://github.com/kahilav2/freeirccloud-frontend">
          <img src='github-mark-light-64px.png' alt="github"/>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.left {
  float: left;
  margin-right: 30px;
}
.right {
  div {
    a {
      img {
        width: 25px;
      }
    }
  }
}
footer {
  color: #909090;
  padding: var(--landing-page-footer-padding);

  font-size: 16px;
  h4 {
    margin-bottom: 4px;
  }
}

</style>
