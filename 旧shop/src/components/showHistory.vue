<template>
  <a-modal title="历史记录" v-model="visible2" @ok="handleOk2">
    <template v-for="(item,index) in showHistorydata">
      <p :key="index">{{item}}</p>
    </template>
  </a-modal>
</template>
