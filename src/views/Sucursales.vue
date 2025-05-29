<template>
  <div class="container">
    <h1 class="text-start">Lista de Sucursales | 
    <button @click="newSucursal()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
      </h1>
    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sucursale, index) in sucursales" :key="index">
          <td>{{ sucursale.id }}</td>
          <td>{{ sucursale.nombre }}</td>
          <td>{{ sucursale.direccion }}</td>
          <td>{{ sucursale.telefono }}</td>
          <td>{{ sucursale.user?.name ?? 'Sin asignar' }}</td>
          <td>
            <button
              @click="editarSucursal(sucursale.id)"
              class="btn btn-warning mx-2"
            >
              <font-awesome-icon icon="pencil" />
            </button>
            <button
              @click="eliminarSucursal(sucursale.id)"
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
import axios from 'axios';
import Swal from 'sweetalert2'; // Corregido de "Swalert" a "Swal"

export default {
  name: 'Sucursales',
  data() {
    return {
      sucursales: []
    };
  },
  methods: {
    newSucursal() {
      this.$router.push({ name: 'NuevaSucursal' });
    },
    editarSucursal(id) {
      this.$router.push({ name: 'EditarSucursal', params: { id } });
    },
    eliminarSucursal(id) {
      Swal.fire({
        title: `¿Deseas eliminar la sucursal con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/sucursales/${id}`)
            .then((response) => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', 'La sucursal ha sido eliminada.', 'success');
                this.sucursales = response.data.sucursales;
              }
            })
            .catch((error) => {
              console.error('Error eliminando sucursal:', error);
            });
        }
      });
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/sucursales')
      .then((response) => {
        console.log(response.data);
        this.sucursales = response.data.sucursales?.data ?? response.data.sucursales ?? [];
      })
      .catch((error) => {
        console.error('Error al cargar sucursales:', error);
      });
  }
};
</script>

