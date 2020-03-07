<template>
    <nav class="navbar navbar-expand-lg navbar-dark primary-color">
        <a class="navbar-brand" href="#">
            <img src="@/assets/remington-logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
            Modelos de Simulación
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <router-link to="/markov" class="nav-item" exact-active-class="active">
                    <a class="nav-link">Cadenas de Markov</a>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Menu',
}
</script>
