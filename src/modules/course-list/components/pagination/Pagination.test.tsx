import { render } from '@testing-library/react';
import { useLocation, BrowserRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';

import { Pagination } from './Pagination.component';

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe('Pagination component', () => {
  beforeEach(() => {
    (useLocation as Mock).mockReturnValue({
      search: '?page=1',
    });
  });

  afterEach(() => {
    (useLocation as Mock).mockReset();
  });

  it('displays the correct number of pages', () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <Pagination
          itemsPerPage={10}
          totalPageCount={3}
          setStartOffset={() => {}}
        />
      </BrowserRouter>
    );

    const pageButtons = getAllByRole('button');

    expect(pageButtons).toHaveLength(5);
  });
});
