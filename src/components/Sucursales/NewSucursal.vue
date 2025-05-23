<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">New</h1>
    <div class="card">
      <div class="card-header fw-bold">Sucursal</div>
      <div class="card-body">
        <form @submit.prevent="saveSucursal">
          <div class="row mb-3">
            <label for="id" class="form-label">No: </label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
              <input
                type="text"
                class="form-control"
                id="id"
                placeholder="No sucursal"
                disabled
                v-model="sucursale.id"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="nombre" class="form-label">Nombre: </label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input
                type="text"
                class="form-control"
                id="nombre"
                placeholder="Nombre Sucursal"
                v-model="sucursale.nombre"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="direccion" class="form-label">Direccion: </label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input
                type="text"
                class="form-control"
                id="direccion"
                placeholder="Direccion Sucursal"
                v-model="sucursale.direccion"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="telefono" class="form-label">Telefono: </label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input
                type="text"
                class="form-control"
                id="telefono"
                placeholder="Telefono Sucursal"
                v-model="sucursale.telefono"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="user" class="form-label">user: </label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="building" /></div>
              <input
                type="text"
                class="form-control"
                id="iser"
                placeholder="Usuario Sucursal"
                v-model="sucursale.user"
              />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Save</button>
          <button class="btn btn-secondary mx-2" @click="cancel">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewComuna',
  data() {
      return {
        sucursale: {
          id: 0,
          nombre: '',
          direccion: '',
          telefono: '',
          user: ''
        },
      }
    },
  methods: {
    cancel() {
      this.$router.push({ name: 'Sucursales' })
    },
    async saveSucursal() {
      const res = await axios.post('http://127.0.0.1:8000/api/sucursales/', this.sucursale)
      console.log(res)
      if (res.status === 200) {
        this.$router.push({ name: 'Sucursales' })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sucursal has been saved',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  },
  
}
</script>
