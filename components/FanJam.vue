<template>
  <img src="https://cdn.nba.com/teams/uploads/sites/1610612746/2022/04/LAClippers_Primary_Icon_pms.svg" alt="" style="width:100px; margin: 0 auto">
  <h1>Clippers Fan Jam</h1>
  <form class="form-widget" @submit.prevent="updateVotes">
    <div
      v-for="value in values"
      :key="value.id"
      class="filters__filter-items__type"
    >
      <input type="radio" :value="value.id" :id="value.id" name="vote" v-model="vote">
      <label :for="value.id">{{value.name}} | {{value.artist}}</label>
    </div>
   
    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Voting ...' : 'Vote Now!'"
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
      name: "We Will Rock You",
      artist: "Queen"
    }, 
    {
      id: 2,
      name: "Hey Ho Let's Go",
      artist: "The Ramones"
    },
    {
      id: 3,
      name: "California Love",
      artist: "2Pac and Doctor Dre"
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
          //console.log(vote.value)
          loading.value = true
          // const updates = {
          //     song_1: username.value,
          // }
          if (vote.value === 1){
            //console.log("one")
            let { error } = await supabase.rpc('increment', { row_id: 1 })
            if (error) throw error
          }
          else if (vote.value === 2){
            //console.log("two")
            let { error } = await supabase.rpc('increment_song_2', { row_id: 1 })
            if (error) throw error
          }
          else{
            //console.log("three")
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
          console.log("voted")
          navigateTo('https://lively-axolotl-1fad84.netlify.app/thankyou',{ external: true })
      }
  }

</script>