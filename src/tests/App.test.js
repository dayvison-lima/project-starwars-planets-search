import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './mockPlanets'
import PlanetProvider from '../context/PlanetProvider'
// import FetchPlanetsApi from '.././services/FetchPlanetsApi'
import { act } from 'react-dom/test-utils';

const tableHeaders = [
  "Name",
  "Climate",
  "Terrain",
  "Population",
  "Gravity",
  "Diameter",
  "Orbital Period",
  "Rotation Period",
  "Surface Water",
  "Films",
  "Created",
  "Edited",
  "URL",
]

describe('testando a aplicação', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  it('testa se chama a api', () => {
    render(
    <PlanetProvider>
      <App />
      </PlanetProvider>
      )
      expect(global.fetch).toHaveBeenCalled();

  })

  it('testa a página inicial da aplicação', () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    )

    const nameInput = screen.getByTestId('name-filter')
    const columnInput = screen.getByTestId('column-filter')
    const comparisonInput = screen.getByTestId('comparison-filter')
    const numberInput = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')

    expect(nameInput).toBeInTheDocument()
    expect(columnInput).toBeInTheDocument()
    expect(comparisonInput).toBeInTheDocument()
    expect(numberInput).toBeInTheDocument()
    expect(btnFilter).toBeInTheDocument()

    act(() => {
      userEvent.clear(numberInput)
      userEvent.type(numberInput, 1000000000)
      userEvent.click(btnFilter)
      
    })

    waitFor(() => {
      const population = screen.getByText(/naboo/i)
      expect(population).toBeInTheDocument()
    })

  })

  it('testa o filtro de nome', () => {
    render(
    <PlanetProvider>
      <App />
      </PlanetProvider>
      )
      const nameInput = screen.getByTestId('name-filter')
      act(() => {
        userEvent.type(nameInput, 'ooi')

      })
      
       waitFor(() => {
        const resultado = screen.getByText(/tatooine/i)
         expect(resultado).toBeInTheDocument()      

  })
})

it('testa os filtros numéricos', () => {
  render(
  <PlanetProvider>
    <App />
    </PlanetProvider>
    )
    const columnInput = screen.getByTestId('column-filter')
    const comparisonInput = screen.getByTestId('comparison-filter')
    const numberInput = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')

    act(() => {
      userEvent.selectOptions(columnInput, 'orbital_period')
      userEvent.selectOptions(comparisonInput, 'maior que')
           userEvent.type(numberInput, 350)
           userEvent.click(btnFilter)
    })

    waitFor(() => {
       
                  const planetOne = screen.getByText(/alderaan/i)
             
                 const planetTwo = screen.getByText(/yavin iv/i)
                 const filtrosOne = screen.getByText(/orbital_period maior que 350/i)
             
                 expect(planetOne).toBeInTheDocument()
                 expect(planetTwo).toBeInTheDocument()
                 expect(filtrosOne).toBeInTheDocument()
      
           })

           act(() => {
            userEvent.selectOptions(columnInput, 'diameter')
                 userEvent.selectOptions(comparisonInput, 'menor que')
                 userEvent.clear(numberInput)
                 userEvent.type(numberInput, 12000)
                 userEvent.click(btnFilter)
           })

           waitFor(() => {
                  const planetTree = screen.getByText(/hoth/i)
                  const planetFour = screen.getByText(/endor/i)
                  const filtrosTwo = screen.getByText(/diameter menor que 12000/i)
                  
                  expect(planetTree).toBeInTheDocument()
                  expect(planetFour).toBeInTheDocument()
                  expect(filtrosTwo).toBeInTheDocument();
                 })

          act(() => {
            userEvent.selectOptions(columnInput, 'population')
                 userEvent.selectOptions(comparisonInput, 'igual a')
                 userEvent.clear(numberInput)
                 userEvent.type(numberInput, 1000)
                 userEvent.click(btnFilter)
          })

          waitFor(() => {
                  const planetFive = screen.getByText(/yavin iv/i)
                  const filtrosTree = screen.getByText(/population igual a 1000/i)
                  expect(planetFive).toBeInTheDocument()
                  expect(filtrosTree).toBeInTheDocument()
            
                 const listaFiltros = screen.getAllByTestId('filter')
                 expect(listaFiltros).toHaveLength(3)
                 
                 })

          act(() => {
            const buttonRemoveOne = screen.getAllByText('Remover')
                 userEvent.click(buttonRemoveOne[2])
                 
          })

          waitFor(() => {
            const listaFiltros = screen.getAllByTestId('filter')
                 expect(listaFiltros).toHaveLength(2)
            
                
          })

          act(() => {
            const buttonRemoveAll = screen.getByTestId('button-remove-filters')
            userEvent.click(buttonRemoveAll)
          
          })

          waitFor(() => {
            expect(screen.getByText(/dagobah/i)).toBeInTheDocument()
            expect(screen.getByText(/bespin/i)).toBeInTheDocument()
          })


})


it('testa a tabela', () => {
  render(<PlanetProvider>
    <App />
  </PlanetProvider>);

  tableHeaders.forEach((header) => {
    expect(screen.getByText(`${header}`)).toBeInTheDocument()
  })
})

it('testa o filtro de nome sobre os filtros numéricos', () => {
  render(
  <PlanetProvider>
    <App />
    </PlanetProvider>
    )

         const nameInput = screen.getByTestId('name-filter')
    const columnInput = screen.getByTestId('column-filter')
    const comparisonInput = screen.getByTestId('comparison-filter')
    const numberInput = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')

    waitFor(() => {
      const planet1 = screen.getByText(/tatooine/i)
      const planet2 = screen.getByText(/alderaan/i)
      expect(planet2).toBeInTheDocument()
      expect(planet1).toBeInTheDocument()
      act(() => {
        userEvent.selectOptions(columnInput, 'orbital_period')
               userEvent.selectOptions(comparisonInput, 'maior que')
               userEvent.clear(numberInput)
               userEvent.type(numberInput, 350)
               userEvent.click(btnFilter)
      })
      expect(planet1).not.toBeInTheDocument()
      expect(planet2).toBeInTheDocument()

    })
    

})

})


