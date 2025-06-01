<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar</h1>
    <div class="card">
      <div class="card-header fw-bold">Cliente</div>
      <div class="card-body">
        <form @submit.prevent="updateCliente">
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
                  placeholder="No cliente"
                  disabled
                  v-model="client.id"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="id" class="form-label">Usuario: </label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <select class="form-select" v-model="client.user_id">
                  <option selected value="0">Seleccione el Usuario</option>
                  <option v-for="user in users" v-if="user"
                  :key="user.id" 
                  :value="user.id">
                    {{ user.name }}
                  </option>
                </select>
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
                  id="address"
                  placeholder="Direccion Sucursal"
                  v-model="client.address"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="telefono" class="form-label">Telefono: </label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="phone" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  placeholder="Telefono Sucursal"
                  v-model="client.phone"
                />
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
  name: "EditarCliente",
  data() {
    return {
      client: {
        id: "",
        user_id: "",
        address: "",
        phone: "",
      },
      users: [],
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Clientes" });
    },
    async updateCliente() {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/clients/${this.client.id}`,
        this.client
      );
      if (res.status === 200){
        this.$router.push({ name: 'Clientes' });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Client has been updated',
          showConfirmButton: false,
          timer: 2000
      });
      }
    }
  },
  mounted() {
    this.client.id = this.$route.params.id;
    axios.get(`http://127.0.0.1:8000/api/clients/${this.client.id}`)
      .then(response => {
        this.client = response.data.client;
        this.users = response.data.users;
      })
  }
}
</script>
