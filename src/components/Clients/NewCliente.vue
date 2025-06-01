<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">New</h1>
    <div class="card">
      <div class="card-header fw-bold">Cliente</div>
      <div class="card-body">
        <form @submit.prevent="saveCliente">
          <div class="row mb-3">
            <label for="id" class="form-label">No: </label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="tag" />
              </div>
              <input
                type="text"
                class="form-control"
                id="id"
                placeholder="No Cliente"
                disabled
                v-model="client.id"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="user_id" class="form-label">Usuario: </label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <select class="form-select" v-model="client.user_id">
                <option selected value="0">Seleccione el Usuario</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user?.name }}
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
                placeholder="Direccion Cliente"
                v-model="client.address"
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
                id="phone"
                placeholder="Telefono Sucursal"
                v-model="client.phone"
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "NewCliente",
  data() {
    return {
      client: {
        id: 0,
        user_id: "",
        address: "",
        phone: "",
      },
      users: [],
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Clients" });
    },
    async saveCliente() {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/clients/",
        this.client
      );
      console.log(res);
      if (res.status === 200) {
        this.$router.push({ name: "Clients" });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cliente has been saved",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => {
        this.users = response.data.users;
      })
      .catch((err) => console.error(err));
  },
};
</script>
