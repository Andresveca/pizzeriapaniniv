<template>
  <div class="container">
    <h1>Lista de Sucursales</h1>
    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sucursale, index) in sucursales" :key="index">
          <td>{{ sucursal.id }}</td>
          <td>{{ sucursal.nombre }}</td>
          <td>{{ sucursal.direccion }}</td>
          <td>{{ sucursal.telefono }}</td>
          <td>
            <button
              @click="editarSucursal(sucursal.id)"
              class="btn btn-warning mx-2"
            >
              <font-awesome-icon icon="pencil" />
            </button>
            <button
              @click="eliminarSucursal(sucursal.id)"
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
import Swalert from 'sweetalert2';

export default {
    name: 'Sucursales',
    data() {
        return {
            sucursales: []
        };
    },
    methods: {
        deleteSucursal(id) {
            Swal.fire({
                title: `Do you want to delete the Sucursal with id ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/sucursales/${id}`)
                        .then(response => {
                            if (response.data.success){
                                Swal.fire('Deleted!', 'The Sucursal has been deleted.', 'success');
                                this.sucursales = reponse.data.sucursales;
                        }
                        });
                    }
                });
            }
},
/*editarSucursal(id) {
    this.$router.push({ name: 'EditarSucursal', params: { id } }),
},
newSucursal() {
    this.$router.push({ name: 'NuevaSucursal' });
},*/
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
},

};

</script>
