<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar</h1>
    <div class="card">
      <div class="card-header fw-bold">Sucursal</div>
      <div class="card-body">
        <form @submit.prevent="updateSucursal">
          <div>
            <label for="id" class="form.label">No</label>
            <div>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="tag" />
                </div>
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
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
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
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
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
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
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
              <label for="id" class="form-label">Usuario: </label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="bank" />
                </div>
                <select class="form-select" v-model="sucursale.user_id">
                  <option selected value="">Seleccione el Usuario</option>
                  <option v-for="user in users" v-if="user"
                  :key="user.id" 
                  :value="user.id">
                    {{ user.name }}
                  </option>
                </select>
              </div>
            </div>
            <button class="btn btn-primary" type="submit">Actualizar</button>
            <button
              type="button"
              class="btn btn-secondary mx-2"
              @click="cancelar"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "EditarSucursal",
  data() {
    return {
      sucursale: {
        id: "",
        nombre: "",
        direccion: "",
        telefono: "",
        user_id: "",
      },
      users: [],
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Sucursales" });
    },
    async updateSucursal() {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/sucursales/${this.sucursale.id}`,
        this.sucursale
      );
      if (res.status === 200){
        this.$router.push({ name: 'Sucursales' });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sucursal has been updated',
          showConfirmButton: false,
          timer: 2000
      });
      }
    }
  },
  mounted() {
    this.sucursale.id = this.$route.params.id;
    axios.get(`http://127.0.0.1:8000/api/sucursales/${this.sucursale.id}`)
      .then(response => {
        this.sucursale = response.data.sucursale;
        this.users = response.data.users;
      })
  }
}
</script>
