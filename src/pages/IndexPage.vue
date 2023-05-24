<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Todos</h1>
      <q-btn color="primary" @click="prompt = true">
        Add
      </q-btn>
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px" class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Your Item</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="todo.text" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn color="primary" label="Add Item"  @click="handleSubmit"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
<q-list>
  <q-item v-for="(item, index) in todos" :key="index">
    <q-item-section>
      <q-item-label>Single line item {{ index }}</q-item-label>
      <q-item-label caption lines="2">{{ item.text }}.</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>5 min ago</q-item-label>
      <q-icon name="star" color="yellow" />
    </q-item-section>
  </q-item>
</q-list>
  </q-page>
</template>

<script setup>
  import {onMounted, ref} from 'vue';
  import {socket, swarm} from '../api';

const todos = ref([])
const prompt = ref(false)

  const todo = ref({text: ''})

onMounted(()=>{
  console.log(swarm);
if(swarm) {
  swarm.on('connection', (conn, peerInfo) => {
    conn.on('data', (data) => {
      // console.log(data);
      console.log({data, peerInfo});
      todos.value = data;
    });

    conn.on('close', () => {
      console.log('closed connection');
    })

    conn.on('error', (e) => {
      console.log(e);
    })

  })
}
})

  const handleSubmit = () => {

    socket.onopen = (/*event*/) => {
      socket.send(JSON.stringify(todo.value));
    };

    todo.value.text = ''
    prompt.value = false;
  };

</script>
