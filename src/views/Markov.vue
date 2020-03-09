<template>
  <div>
    <Titulo titulo="Cadenas de Markov" />

    <div class="col-12 mt-5 mb-5">
        <div class="row">
            <div class="col-4">
                <div class="input-group">
                    <input type="number" step="1" class="form-control text-center" 
                      placeholder="1"
                      v-model="ciclos">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-primary">
                            Ciclos
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="input-group">
                    <input type="number" step="1" class="form-control text-center" 
                      placeholder="1"
                      v-model="decimales">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-primary">
                            Decimales
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-4 ml-auto-x">
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
                  <th :colspan="columnas_fila + 1" class="text-center">ESTADO INICIAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="(val, index) in fila" :key="index" class="text-right">
                  <input type="number" step="0.01" class="form-control"
                    :value="fila[index]" 
                    @change="setValueInFila($event, index)">
                </td>
                <td class="text-center">
                  <button class="btn btn-danger" @click="fila.pop()">X</button>
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
              <tr v-for="(x, i) in columnas_fila" :key="i">
                <td v-for="(y, j) in columnas_fila" :key="j" class="text-right">
                  <input type="number" step="0.01" class="form-control" 
                    :value="matriz[i][j]"
                    @change="setValueInMatriz($event, i, j)">
                </td>
              </tr>
              <tr>
                  <td :colspan="columnas_fila" class="text-right">
                      <button class="btn btn-primary" 
                        @click="calcularEstadoFinal()">
                        Hallar estado final
                      </button>
                  </td>
              </tr>
            </tbody>
        </table>
    </div>

    <div v-if="estado_final.length" class="col-12 mt-5 mb-5">
        <table class="table table-sm table-bordered">
            <thead>
              <tr>
                  <th :colspan="columnas_fila + 1" class="text-center">ESTADO FINAL</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fila, i) in estado_final" :key="i">
                <td class="text-center">
                  P{{i}}
                </td>
                <td v-for="(columna, j) in fila" :key="j" class="text-right">
                  {{ columna }}
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
      decimales: 5,
      ciclos: 5,
      new_row: 0,

      fila   : [0.4, 0.25, 0.35],
      matriz : [
        [0.6, 0.2, 0.2], 
        [0.3, 0.5, 0.2], 
        [0.3, 0.3, 0.4],
      ],

      estado_final: [],
    })
  },
  computed: {
    columnas_fila: function() {
      return this.fila.length;
    },
  },
  watch: {
    'columnas_fila': function(newVal) {
      this.matriz = [];

      for(let i=0; i < newVal; i++) {
        let fila = [];

        for(let j=0; j < newVal; j++){
          fila.push('0.0');
        }

        this.matriz.push(fila); console.log('Watch', i, fila)
      }
    }
  },
  methods: {
    addRow: function() {
      this.fila.push(parseFloat(this.new_row));
      this.new_row = 0;
      this.estado_final = [];
    },

    setValueInFila: function(e, i) {
      this.fila[i] = parseFloat(e.target.value);
    },

    setValueInMatriz: function(e, i, j) {
      this.matriz[i][j] = parseFloat(e.target.value);
    },

    roundDecimals: function(number) {
      let potencia = Math.pow(10, this.decimales);

      return parseInt(number * potencia) / potencia;
    },
    multiplicarFilaPorMatriz: function(fila, matriz) {
      return fila.reduce((aco, val, i) => {
          let suma = fila.reduce((a, v, j) => {
              return a += matriz[j][i] * v;
          }, 0)

          return aco.push(this.roundDecimals(suma)) && aco;
      }, [])
    },
    calcularEstadoFinal: function() {
      let new_estado = this.fila;

      this.estado_final = [];
      this.estado_final.push(new_estado);

      for(let i=0; i < this.ciclos; i++) {
        new_estado = this.multiplicarFilaPorMatriz(new_estado, this.matriz);
        this.estado_final.push(new_estado);
      }
    }
  }
}
</script>
