<template>
  <div class="avatar">
    <i class="photo ic-account-circle" />
    <div class="status-badge" />
  </div>
</template>

<style lang="scss" scoped>
  .avatar {
    position: relative;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    .photo {
      font-size: 42px;
      color: $cms-text-color;
    }

    .status-badge {
      position: absolute;
      width: 9px;
      height: 9px;
      right: 3px;
      bottom: 3px;
      background: $cms-success-color;
      border-radius: 50%;
      border: 3px solid #ffffff;
      box-sizing: content-box;
    }
  }
</style>
