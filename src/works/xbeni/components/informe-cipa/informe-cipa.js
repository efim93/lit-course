import { LitElement, html } from 'lit-element';
import { informeCipaStyles } from '../../archivos_comunes/ac_informe-cipa/styles';
import { svgUpArrow, svgOrderCircleRed, svgCircleYellow } from '../../archivos_comunes/ac_informe-cipa/svc_icons';
import { cargarInformacionCandidatosCipa } from '../../archivos_comunes/ac_informe-cipa/mocks';
import { nothing } from 'lit-html';

export class BeniListaCipa extends LitElement {
  constructor() {
    super();
    this.datosCipa = cargarInformacionCandidatosCipa;
    this.cargarFechaVencimiento();
  }

  static get properties() {
    return {
      datosCipa: { type: Array },
    };
  }

  static get styles() {
    return [informeCipaStyles];
  }

  render() {
    return html`
      <div id="id_body_cipa" class="div_body_cipa">
        <div class="div_main_cipa">
          <table class="tabla_cipa">
            <!--  HEADER TABLA -->
            <tr>
              <th @click="${() => this.orderList('nombre')}" class="col nombre">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Nombre</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_name" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th @click="${() => this.orderList('email')}" class="col email">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Correo electronico</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_email" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <label>Telefono</label>
              </th>
              <th @click="${() => this.orderList('perfil')}" class="col perfil">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Perfil</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_perfil" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th @click="${() => this.orderList('en_plantilla')}" class="col en_plantilla">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>En plantilla</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_plantilla" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th @click="${() => this.orderList('fecha_ultima_actualizacion')}" class="col fecha_ultima_actualizacion">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Fecha de ultima actualizacion de datos</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_fua" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th @click="${() => this.orderList('fechaVencimiento')}" class="col fechaVencimiento">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Fecha de vencimiento</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_fv" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <label>Semaforo</label>
              </th>
            </tr>

            <!--  MAIN TABLA -->
            ${this.datosCipa.map(
              (item) => html`
                <tr>
                  <td>
                    <label
                      class="label_nombre_candidato_cipa"
                      @click=${() => this.dirigirUrlEditarCandidato(item.nombre)}
                    >
                      ${this.cambiarFormatoNombre(item.nombre)}
                    </label>
                  </td>
                  <td>
                    <label> ${this.cambiarFormatoCorreo(item.email)} </label>
                  </td>
                  <td>
                    <label> ${item.telefono} </label>
                  </td>
                  <td>
                    <label> ${this.cambiarFormatoPerfil(item.perfil)} </label>
                  </td>
                  <td>
                    <div class="checkbox">
                      ${item.en_plantilla
                        ? html`<input checked disabled id="checkbox1_${item}" type="checkbox" value="1" />
                            <label for="checkbox1_${item}"></label>`
                        : html`<input disabled id="checkbox1_${item}" type="checkbox" value="1" />
                            <label for="checkbox1_${item}"></label> `}
                    </div>
                  </td>
                  <td>
                    <label> ${this.formatRequiredDate(item.fecha_ultima_actualizacion)} </label>
                  </td>
                  <td>
                    <label> ${this.formatRequiredDate(item.fechaVencimiento)} </label>
                  </td>
                  <td>
                    <div class="div_semaforo">
                      ${this.calcularDiferenciaFechaSemaforo(item.fechaVencimiento) === 'rojo'
                        ? html`${svgOrderCircleRed}`
                        : html`
                            ${this.calcularDiferenciaFechaSemaforo(item.fechaVencimiento) === 'amarillo'
                              ? html`${svgCircleYellow}`
                              : nothing}
                          `}
                    </div>
                  </td>
                </tr>
              `,
            )}
          </table>
        </div>
      </div>

      <div class="div_slot_bottom">
        <slot name="bottom"> </slot>
      </div>
    `;
  }

  cargarFechaVencimiento() {
    for (let i = 0; i < this.datosCipa.length; i++) {
      this.datosCipa[i].fechaVencimiento = this.generateDateEndToAddComponent(
        this.datosCipa[i].fecha_ultima_actualizacion,
      );
    }
  }

  selectColumn(column) {
    this.shadowRoot.querySelectorAll('.col').forEach((col) => {
      col.classList.remove('selected');
      col.classList.remove('orderDown');
    });
    this.shadowRoot.querySelector(`.${column}`).classList.add('selected');
  }

  orderList(column) {
    this.selectColumn(column);
    const myList = [...this.datosCipa];
    let orderedList = [];

    // ORDENA STRING
    if (column === 'nombre' || column === 'email' || column === 'perfil') {
      orderedList = myList.sort((a, b) => {
        if (a[column].toLowerCase() < b[column].toLowerCase()) return -1;
        if (a[column].toLowerCase() > b[column].toLowerCase()) return 1;
        return 0;
      });
    }
    // ORDENA BOLEANOS - NUMEROS
    if (column === 'en_plantilla') {
      orderedList = myList.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      });
    }
    // ORDENA FECHAS - FORMATO DATOS A RECIBIR DD/MM/YYYY
    if (column === 'fecha_ultima_actualizacion' || column === 'fechaVencimiento') {
      orderedList = myList.sort((a, b) => {
        if (a[column].getTime() < b[column].getTime()) return -1;
        if (a[column].getTime() > b[column].getTime()) return 1;
        return 0;
      });
    }

    if (JSON.stringify(this.datosCipa) === JSON.stringify(orderedList)) {
      orderedList.reverse();
      this.shadowRoot.querySelector(`.${column}`).classList.add('orderDown');
    }

    this.datosCipa = [...orderedList];
  }

  dirigirUrlEditarCandidato(idCandidatoEditar) {
    /* CUANDO SE INTRODUCA EN PRODUCCION EDITAR ESTA FUNCION PARA QUE REDIRIGA A EDITAR PERFIL DEL CANDIDATO CON ESTE NOMBRE O PASAR OTRO PARAMETRO DESDE LA BASE DE DATOS CON SU RESPECTIVO ID: EXTRAERLO DE LA FUNCION QUE CARGA POR DEFECTO EL CONSTRUCTOR RESULTADOS BASE DATOS JSON */
    // eslint-disable-next-line no-console
    console.log('URL: REDIRIGIR URL - EDITAR CANDIDATO [ ' + idCandidatoEditar + ' ]');
  }

  cambiarFormatoPerfil(perfil) {
    const resultado = perfil[0].toUpperCase() + perfil.slice(1);
    return resultado;
  }

  cambiarFormatoCorreo(email) {
    const resultado = email.toLowerCase();
    return resultado;
  }

  cambiarFormatoNombre(nombre) {
    const dato = nombre.toLowerCase();
    const arrayDatos = dato.split(' ');
    let resultado = '';

    for (let i = 0; i < arrayDatos.length; i++) {
      if (i === arrayDatos.length - 1) {
        resultado += arrayDatos[i][0].toUpperCase() + arrayDatos[i].slice(1);
      } else {
        resultado += arrayDatos[i][0].toUpperCase() + arrayDatos[i].slice(1) + ' ';
      }
    }
    return resultado;
  }

  calcularDiferenciaFechaSemaforo(fechaVencimiento) {
    const date = new Date();

    const fechaVenciminetoFormato = new Date(fechaVencimiento);
    const fechaVencimiento3Meses = new Date(fechaVencimiento);
    fechaVencimiento3Meses.setMonth(fechaVenciminetoFormato.getMonth() - 3);
    const diff3Milis = fechaVenciminetoFormato.getTime() - fechaVencimiento3Meses.getTime();
    const diasDif3Meses = Math.floor(diff3Milis / (1000 * 60 * 60 * 24));

    const fechaVencimiento1Meses = new Date(fechaVencimiento);
    fechaVencimiento1Meses.setMonth(fechaVenciminetoFormato.getMonth() - 1);
    const diff1Milis = fechaVenciminetoFormato.getTime() - fechaVencimiento1Meses.getTime();
    const diasDif1Meses = Math.floor(diff1Milis / (1000 * 60 * 60 * 24));

    const fechaInicio = new Date(fechaVenciminetoFormato).getTime();
    const fechaFin = new Date(date).getTime();
    const diff = fechaInicio - fechaFin;
    const diferenciaFechasActualVencimiento = Math.floor(diff / (1000 * 60 * 60 * 24));

    let valorFinalEnviar = null;
    if (diferenciaFechasActualVencimiento <= diasDif1Meses) {
      valorFinalEnviar = 'rojo';
    }
    if (diferenciaFechasActualVencimiento <= diasDif3Meses && diferenciaFechasActualVencimiento >= diasDif1Meses) {
      valorFinalEnviar = 'amarillo';
    }
    return valorFinalEnviar;
  }

  formatRequiredDate(date) {
    const date1 = new Date(date);
    const day = date1.getDate();
    const month = parseInt(date1.getMonth()) + 1;
    const year = date1.getFullYear();
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  }

  generateDateEndToAddComponent(fechaUltimaActualizacion) {
    const date = new Date(fechaUltimaActualizacion);
    date.setMonth(date.getMonth() + 18);
    return date;
  }
}

customElements.define('informe-cipa', BeniListaCipa);
