<template>
  <div>
    <Titulo titulo="Cadenas de Markov" />

    <div class="col-12 mt-5 mb-5">
        <div class="col-xs-6 col-md-4 ml-auto div-input-paso">
            <div class="a">
                <div class="input-group">
                    <input type="number" step="0.01" class="form-control" v-model="new_row" placeholder="1">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-primary" @click="addRow">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-sm table-bordered">
            <thead>
              <tr>
                  <th :colspan="columnas_fila" class="text-center">ESTADO INICIAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="(val, index) in fila" :key="index" class="text-right">
                  {{ val }}
                </td>
              </tr>
            </tbody>
        </table>
    </div>

    <div class="col-12 mt-5 mb-5">
        <table class="table table-sm table-bordered">
            <thead>
              <tr>
                  <th :colspan="columnas_fila" class="text-center">
                    MATRIZ DE PROBABILIDADES DE TRANSICIÓN
                  </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in columnas_fila" :key="i">
                <td v-for="j in columnas_fila" :key="j" class="text-right">
                  <input type="number" step="0.01" class="form-control" v-model="matriz[i]">
                </td>
              </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Titulo from '@/components/Titulo.vue'
// import Coordenadas from '@/components/Coordenadas.vue'

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Markov',
  components: {
    Titulo,
    //Coordenadas,
  },
  data: function() {
    return ({
      fila   : [1, 2, 3],
      matriz : [
        [], [], []
      ],
      new_row: 0,
    })
  },
  computed: {
    columnas_fila: function() {
      return this.fila.length;
    },
  },
  methods: {
    addRow: function() {
      this.fila.push(this.new_row);
      this.new_row = 0;
    },

    roundDecimals: function(number, decimal) {
      return (potencia = Math.pow(10, decimal)) && parseInt(number * potencia) / potencia;
    },
    multiplicarFilaPorMatriz: function(fila, matrix) {
      return fila.reduce((aco, val, i) => {
          suma = fila.reduce((a, v, j) => {
              return a += matrix[j][i] * v;
          }, 0)

          return aco.push(roundDecimals(suma, 5)) && aco;
      }, [])
    }
  }
}
</script>
