// hotel-reservation.ts
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ContatoTelefone = /** @class */ (function () {
    function ContatoTelefone(telefone) {
        this.telefone = telefone;
    }
    ContatoTelefone.prototype.enviarMensagem = function (mensagem) {
        console.log("Enviando SMS para ".concat(this.telefone, ": ").concat(mensagem));
    };
    return ContatoTelefone;
}());
var ContatoEmail = /** @class */ (function () {
    function ContatoEmail(email) {
        this.email = email;
    }
    ContatoEmail.prototype.enviarMensagem = function (mensagem) {
        console.log("Enviando e-mail para ".concat(this.email, ": ").concat(mensagem));
    };
    return ContatoEmail;
}());
// Superclasse com herança
var Entidade = /** @class */ (function () {
    function Entidade(_id) {
        this._id = _id;
    }
    Object.defineProperty(Entidade.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    return Entidade;
}());
var Hotel = /** @class */ (function (_super) {
    __extends(Hotel, _super);
    function Hotel(nome, id, contato) {
        var _this = _super.call(this, id) || this;
        _this.nome = nome;
        _this.contato = contato;
        _this.reservasDoHotel = [];
        return _this;
    }
    Hotel.prototype.getNome = function () {
        return this.nome;
    };
    Hotel.prototype.adicionarReserva = function (reserva) {
        this.reservasDoHotel.push(reserva);
    };
    Hotel.prototype.listarReservas = function () {
        return this.reservasDoHotel;
    };
    return Hotel;
}(Entidade));
var Reserva = /** @class */ (function () {
    function Reserva(idReserva, idHotel, nomeResponsavel, diaEntrada, diaSaida) {
        this.idReserva = idReserva;
        this.idHotel = idHotel;
        this.nomeResponsavel = nomeResponsavel;
        this.diaEntrada = diaEntrada;
        this.diaSaida = diaSaida;
    }
    Reserva.prototype.getIdReserva = function () {
        return this.idReserva;
    };
    Reserva.prototype.getNomeResponsavel = function () {
        return this.nomeResponsavel;
    };
    return Reserva;
}());
var Pessoa = /** @class */ (function (_super) {
    __extends(Pessoa, _super);
    function Pessoa(nomeResponsavel, id) {
        var _this = _super.call(this, id) || this;
        _this.nomeResponsavel = nomeResponsavel;
        _this.reservasPessoa = [];
        return _this;
    }
    Pessoa.prototype.adicionarReserva = function (reserva) {
        this.reservasPessoa.push(reserva);
    };
    Pessoa.prototype.getReservas = function () {
        return this.reservasPessoa;
    };
    Pessoa.prototype.getNome = function () {
        return this.nomeResponsavel;
    };
    return Pessoa;
}(Entidade));
var SistemaReservas = /** @class */ (function () {
    function SistemaReservas() {
        this.hoteis = [];
        this.reservas = [];
        this.pessoas = [];
        this.proximoIdPessoa = 1;
    }
    SistemaReservas.prototype.cadastrarHotel = function (nome, id, contato) {
        var hotel = new Hotel(nome, id, contato);
        this.hoteis.push(hotel);
        return hotel;
    };
    SistemaReservas.prototype.cadastrarReserva = function (nomeHotel, nomeResponsavel, diaEntrada, diaSaida) {
        var hotel = this.hoteis.find(function (h) { return h.getNome() === nomeHotel; });
        if (!hotel) {
            console.log('Hotel não encontrado.');
            return null;
        }
        var idReserva = Math.floor(Math.random() * 90000) + 10000;
        var reserva = new Reserva(idReserva, hotel.id, nomeResponsavel, diaEntrada, diaSaida);
        this.reservas.push(reserva);
        hotel.adicionarReserva(reserva);
        var pessoa = this.pessoas.find(function (p) { return p.getNome() === nomeResponsavel; });
        if (!pessoa) {
            pessoa = new Pessoa(nomeResponsavel, this.proximoIdPessoa++);
            this.pessoas.push(pessoa);
        }
        pessoa.adicionarReserva(reserva);
        return reserva;
    };
    SistemaReservas.prototype.exibirReservasPorHotel = function (idHotel) {
        var hotel = this.hoteis.find(function (h) { return h.id === idHotel; });
        if (hotel) {
            console.log("Reservas do hotel ".concat(hotel.getNome(), ":"), hotel.listarReservas());
        }
        else {
            console.log('Hotel não encontrado.');
        }
    };
    SistemaReservas.prototype.exibirReservasPorPessoa = function (nome) {
        var pessoa = this.pessoas.find(function (p) { return p.getNome() === nome; });
        if (pessoa) {
            console.log("Reservas de ".concat(pessoa.getNome(), ":"), pessoa.getReservas());
        }
        else {
            console.log('Pessoa não encontrada.');
        }
    };
    return SistemaReservas;
}());
// Exemplo de uso
var sistema = new SistemaReservas();
var contatoTelefone = new ContatoTelefone("11 99999-9999");
sistema.cadastrarHotel("Hotel Central", 12345, contatoTelefone);
var contatoEmail = new ContatoEmail("contato@hotel.com");
sistema.cadastrarHotel("Hotel Email", 54321, contatoEmail);
sistema.cadastrarReserva("Hotel Central", "Ana", "01/05", "05/05");
sistema.cadastrarReserva("Hotel Central", "Ana", "10/05", "15/05");
sistema.cadastrarReserva("Hotel Email", "Carlos", "02/05", "04/05");
sistema.exibirReservasPorHotel(12345);
sistema.exibirReservasPorPessoa("Ana");
