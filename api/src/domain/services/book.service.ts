import BookEntity from "../entities/book.entity";
import BookRepositoryInterface from "../repositories/book.repository";

export default class BookService {
    constructor(private readonly repo: BookRepositoryInterface) {}

    list(): BookEntity[]
    {
        return this.repo.getAll()
    }

    get(id: number): BookEntity
    {
        return this.repo.findById(id)
    }

    createPurchase(id: number): BookEntity
    {
        const book = this.get(id)
        if (book.amount < 1) {
            throw new Error("Don't have books to share");
        }
        book.amount--;
        this.repo.update(id, book)
        return this.get(id)
    }
}
