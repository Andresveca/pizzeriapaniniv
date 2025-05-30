<template>
  <div class="container">
    <h1 class="text-start">
      Lista de Clientes |
      <button @click="newCliente()" class="btn btn-success mx-2" >
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Usuario</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, index) in clients" :key="index">
          <td>{{ client.id }}</td>
          <td>{{ client.user?.name ?? 'Sin usuario' }}</td>
          <td>{{ client.address }}</td>
          <td>{{ client.phone }}</td>
          <td>
            <button
              @click="editarCliente(client.id)"
              class="btn btn-warning mx-2"
            >
              <font-awesome-icon icon="pencil" />
            </button>
            <button
              @click="eliminarCliente(client.id)"
              class="btn btn-danger mx-2"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Clients",
  data() {
    return {
      clients: [],
    };
  },
  methods: {
    newCliente() {
      this.$router.push({ name: "NuevoCliente" });
    },
    editarCliente(id) {
      this.$router.push({ name: "EditarCliente", params: { id } });
    },
    eliminarCliente(id) {
      Swal.fire({
        title: `¿Deseas eliminar el cliente con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/clients/${id}`)
            .then((response) => {
              if (response.data.success) {
                Swal.fire(
                  "¡Eliminado!",
                  "El cliente ha sido eliminada.",
                  "success"
                );
                this.clients = response.data.clients;
              }
            })
            .catch((error) => {
              console.error("Error eliminando sucursal:", error);
            });
        }
      });
    },
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/clients")
      .then((response) => {
      console.log('Clientes cargados:', response.data.clients);
      this.clients = response.data.clients?.data ?? response.data.clients ?? [];
      })
      .catch((error) => {
        console.error("Error al cargar clientes:", error);
      });
  },
};
</script>
