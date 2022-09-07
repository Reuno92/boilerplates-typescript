import { cleanup, render, screen } from '@testing-library/react';
import Home from '../pages';
import '@testing-library/jest-dom';
import Header from '../component/template/Header';

describe('Home', () => {
  afterEach(() => {
    cleanup();
  });

  it('should a heading', () => {
    render(<Home />);
    const HEADING = screen.getByRole('heading', {
      name: 'Welcome Page From',
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(HEADING).toBeInTheDocument();
  });

  it('should have image', async () => {
    const { getByAltText } = await render(<Home />);
    const IMG = getByAltText('viseo logo positive digital makers');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(IMG).toHaveAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
  });

  it('should a link for goes to about page', async () => {
    const { getByTitle } = await render(<Header />);
    const LINK = getByTitle('Go to about page');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(LINK).toHaveAttribute('href', '/about');
  });
});
