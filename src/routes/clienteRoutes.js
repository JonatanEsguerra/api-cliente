const express = require('express');
const router = express.Router();
const {
  obtenerTodos,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
} = require('../controllers/clienteController');

router.get('/',              obtenerTodos);
router.get('/:documento',    obtenerUno);
router.post('/',             crear);
router.put('/:documento',    actualizar);
router.delete('/:documento', eliminar);

module.exports = router;
