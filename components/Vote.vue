<template>
  <form class="form-widget" @submit.prevent="updateVotes">
    <h3>Vote</h3>
    <div
      v-for="value in values"
      :key="value.id"
      class="filters__filter-items__type"
    >
      <input type="radio" :value="value.id" :id="value.id" name="vote" v-model="vote">
      <label for="vote">{{value.name}} | {{value.artist}}</label>
    </div>
   Vote: {{vote}}
    <!--<div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div> -->
    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>
  </form>
</template>
<script>
  export default {
    data() {
      return {
        vote: ''
      }
    }
  }
  </script>
<script setup>
  //const vote = ''
  //console.log(vote)
  //const values = [ '1', '2', '3']
  const values = [ 
    {
      id: 1,
      name: "song 1",
      artist: "Artist 1"
    }, 
    {
      id: 2,
      name: "song 2",
      artist: "Artist 2"
    },
    {
      id: 3,
      name: "song 3",
      artist: "Artist 3"
    },
  ]
  const supabase = useSupabaseClient()

  const loading = ref(true)
  const username = ref('')

  const vote = ref('')
  loading.value = true
  let { data } = await supabase
      .from('votes')
      .select(`song_1`)
      .single()
  if (data) {
      vote.value = ''
      username.value = ''
  }
  loading.value = false

  async function updateVotes() {
      try {
          console.log(vote.value)
          loading.value = true
          // const updates = {
          //     song_1: username.value,
          // }
          if (vote.value === 1){
            console.log("one")
            let { error } = await supabase.rpc('increment', { row_id: 1 })
            if (error) throw error
          }
          else if (vote.value === 2){
            console.log("two")
            let { error } = await supabase.rpc('increment_song_2', { row_id: 1 })
            if (error) throw error
          }
          else{
            console.log("three")
            let { error } = await supabase.rpc('increment_song_3', { row_id: 1 })
            if (error) throw error
          }
          //let { error } = await supabase.rpc('increment', { row_id: 1 })
          // let { error } = await supabase.from('votes').upsert(updates, {
          //     returning: 'minimal', // Don't return the value after inserting
          // })
          
      } catch (error) {
          alert(error.message)
      } finally {
          loading.value = false
      }
  }

</script>