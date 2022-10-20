import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EnhancedRecipesTableToolbar from './EnhancedRecipesTableToolbar';
import EnhancedRecipesTableHead from './EnhancedRecipesTableHead';
import { getComparator, stableSort } from '../TableHelpers/TableHelpers'
import { NavBar } from '../../utils/nav/nav';   
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, banRecipeById } from '../../../redux/actions/adminAction';



export const RecipeTable = () => {

  const {recipesList} = useSelector((store) => store.admin)
  
  const dispatch = useDispatch()

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [recipesPerPage, setrecipesPerPage] = React.useState(15);
    const [click, setClick] = React.useState(false)


    React.useEffect(()=>{
      dispatch(getRecipes())
    },[click])


    React.useEffect(() => {
      dispatch(getRecipes())
    }, [])
  

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = recipesList.map((n) => n.banned);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      console.log(selectedIndex, "SELECTED INDEX")
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangerecipesPerPage = (event) => {
      setrecipesPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };

    const handleClick2 = (event, recipe, estado) => {
      console.log(event.target.checked, "ESTE ES EL EVENT")
      console.log(recipe, "ESTE ES RECIPE ID")
      console.log(estado, "ESTE ES EL ESTADO")
      click ? setClick(false) : setClick(true)
      dispatch(banRecipeById(recipe,event.target.checked))
      dispatch(getRecipes())
    }
  
    const isSelected = (id) => { 
      let receta = recipesList.find((recipe) => recipe.id === id)
      return receta.banned
    }
  
    const emptyrecipes =
      page > 0 ? Math.max(0, (1 + page) * recipesPerPage - recipesList.length) : 0;
  
    return (<>
      <NavBar/>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedRecipesTableToolbar numSelected={selected.length} /> 
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedRecipesTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={recipesList.length}
              />
              <TableBody>
                {stableSort(recipesList, getComparator(order, orderBy))
                  .slice(page * recipesPerPage, page * recipesPerPage + recipesPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={(event) => handleClick2(event, row.id, isItemSelected)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.healthScore}</TableCell>
                        <TableCell align="left">{row.createdInDB.toString()}</TableCell>
                        <TableCell align="left">{row.banned.toString()}</TableCell>
                        {/* <TableCell align="left">{row.user_id}</TableCell> */}
  
                      </TableRow>
                    );
                  })}
                {emptyrecipes > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyrecipes,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            recipesPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={recipesList.length}
            recipesPerPage={recipesPerPage}
            page={page}
            onPageChange={handleChangePage}
            onrecipesPerPageChange={handleChangerecipesPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box></>
    );
}


