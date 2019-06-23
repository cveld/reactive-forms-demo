import { WerkEnInkomenForm } from './werk-en-inkomen.form';
import { SituatieInkomstenEnum } from 'src/app/shared/enums/situatieinkomsten.enum';
import { JaNeeEnum, HeelKalenderjaarZEZEnum } from 'src/app/shared/enums';
import { FormValidators } from 'src/app/shared/forms/form-validators';

describe('werk en inkomen form', () => {
    let form: WerkEnInkomenForm;

    beforeEach(() => {
        form = new WerkEnInkomenForm();
        form.valueChanges.subscribe(() => {
            FormValidators.validateForm(form, false);
        });
    });

    it('should be invalid', () => {
        expect(form.invalid).toBe(true);
    });

    it('should be invalid when only situatieInkomsten is set', () => {
        form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);

        expect(form.invalid).toBe(true);
    });

    it('should be invalid when only situatieInkomsten and kvknummer are set', () => {
        form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        form.controls.kvknummer.setValue('123456789');

        expect(form.invalid).toBe(true);
    });

    it('should have valid kvknummer when only situatieInkomsten and kvknummer are set', () => {
        form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        form.controls.kvknummer.setValue('123456789');

        expect(form.controls.kvknummer.valid).toBe(true);
    });

    describe('; situatieInkomsten: eigen onderneming', () => {
        beforeEach(() => {
            form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
            form.controls.kvknummer.setValue('123456789');
        });

        it('should be invalid', () => {
            expect(form.invalid).toBe(true);
        });

        it('should be valid when indicatieUrencriterium is set to ja', () => {
            form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.ja);

            expect(form.valid).toBe(true);
        });

        describe('; indicatieUrencriteriumZEZ: nee', () => {
            beforeEach(() => {
                form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
                form.controls.datumStartWerk.setValue(new Date(1977, 5, 22));
            });

            it('should be invalid', () => {
                expect(form.invalid).toBe(true);
            });

            describe('; heelKalenderjaarZEZ: ja', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.Ja);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);

                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');

                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });

            describe('; heelKalenderjaarZEZ: nee zelfstandig', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeZelfstandig);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });

            describe('; heelKalenderjaarZEZ: nee ao', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeAO);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });

            describe('; heelKalenderjaarZEZ: nee toelichting', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeToelichting);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                it('should have invalid toelichting', () => {
                    expect(form.controls.toelichtingHeelKalenderjaarZEZ.invalid).toBe(true);
                });

                it('should have valid toelichting when filled', () => {
                    form.controls.toelichtingHeelKalenderjaarZEZ.setValue('do or do not, there is no try');
                    expect(form.controls.toelichtingHeelKalenderjaarZEZ.valid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.toelichtingHeelKalenderjaarZEZ.setValue('do or do not, there is no try');
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                        form.controls.toelichtingHeelKalenderjaarZEZ.setValue('do or do not, there is no try');
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });
        });
    });

    describe('; situatieInkomsten: alfa particuliere hulp', () => {
        beforeEach(() => {
            form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        });

        it('should have valid kvknummer', () => {
            expect(form.controls.kvknummer.valid).toBe(true);
        });

        it('should be invalid', () => {
            expect(form.invalid).toBe(true);
        });

        it('should be valid when indicatieUrencriterium is set to ja', () => {
            form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.ja);
            expect(form.valid).toBe(true);
        });

        describe('; indicatieUrencriteriumZEZ: nee', () => {
            beforeEach(() => {
                form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
                form.controls.datumStartWerk.setValue(new Date(1977, 5, 22));
            });

            it('should be invalid', () => {
                expect(form.invalid).toBe(true);
            });

            describe('; heelKalenderjaarZEZ: ja', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.Ja);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            form.updateValueAndValidity();
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            form.updateValueAndValidity();
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });

            describe('; heelKalenderjaarZEZ: nee zelfstandig', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeZelfstandig);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            form.updateValueAndValidity();
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            form.updateValueAndValidity();
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });

            describe('; heelKalenderjaarZEZ: nee ao', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeAO);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            form.updateValueAndValidity();
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            form.updateValueAndValidity();
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });

            describe('; heelKalenderjaarZEZ: nee toelichting', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeToelichting);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                it('should have invalid toelichting', () => {
                    expect(form.controls.toelichtingHeelKalenderjaarZEZ.invalid).toBe(true);
                });

                it('should have valid toelichting when filled', () => {
                    form.controls.toelichtingHeelKalenderjaarZEZ.setValue('do or do not, there is no try');
                    expect(form.controls.toelichtingHeelKalenderjaarZEZ.valid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.toelichtingHeelKalenderjaarZEZ.setValue('do or do not, there is no try');
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.toelichtingHeelKalenderjaarZEZ.setValue('do or do not, there is no try');
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });
        });
    });

    describe('; situatieInkomsten: bedrijf echtgenoot partner', () => {
        beforeEach(() => {
            form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        });

        it('should have valid kvknummer', () => {
            expect(form.controls.kvknummer.valid).toBe(true);
        });

        it('should be invalid', () => {
            expect(form.invalid).toBe(true);
        });

        it('should be valid when indicatieUrencriterium is set to ja', () => {
            form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.ja);
            expect(form.valid).toBe(true);
        });

        describe('; indicatieUrencriteriumZEZ: nee', () => {
            beforeEach(() => {
                form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
                form.controls.datumStartWerk.setValue(new Date(1977, 5, 22));
            });

            it('should be invalid', () => {
                expect(form.invalid).toBe(true);
            });

            describe('; heelKalenderjaarZEZ: ja', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.Ja);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            form.updateValueAndValidity();
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            form.updateValueAndValidity();
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });

            describe('; heelKalenderjaarZEZ: nee zelfstandig', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeZelfstandig);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            form.updateValueAndValidity();
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            form.updateValueAndValidity();
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });

            describe('; heelKalenderjaarZEZ: nee ao', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeAO);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            form.updateValueAndValidity();
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            form.updateValueAndValidity();
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });

            describe('; heelKalenderjaarZEZ: nee toelichting', () => {
                beforeEach(() => {
                    form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeToelichting);
                });

                it('should be invalid', () => {
                    expect(form.invalid).toBe(true);
                });

                it('should have invalid toelichting', () => {
                    expect(form.controls.toelichtingHeelKalenderjaarZEZ.invalid).toBe(true);
                });

                it('should have valid toelichting when filled', () => {
                    form.controls.toelichtingHeelKalenderjaarZEZ.setValue('do or do not, there is no try');
                    expect(form.controls.toelichtingHeelKalenderjaarZEZ.valid).toBe(true);
                });

                describe('; indicatieAangifteIB1: ja', () => {
                    beforeEach(() => {
                        form.controls.toelichtingHeelKalenderjaarZEZ.setValue('do or do not, there is no try');
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    it('should be valid when bedragInkomstenIB1 is filled correctly', () => {
                        form.controls.bedragInkomstenIB1.setValue(42);
                        expect(form.valid).toBe(true);
                    });

                    it('should be invalid when bedragInkomstenIB1 is filled incorrectly', () => {
                        form.controls.bedragInkomstenIB1.setValue('fortytwo');
                        expect(form.invalid).toBe(true);
                    });
                });

                describe('; indicatieAangifteIB1: nee', () => {
                    beforeEach(() => {
                        form.controls.toelichtingHeelKalenderjaarZEZ.setValue('do or do not, there is no try');
                        form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
                    });

                    it('should be invalid', () => {
                        expect(form.invalid).toBe(true);
                    });

                    describe('; indicatieAangifteIB2: ja', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when bedragInkomstenIB2 is filled correctly', () => {
                            form.controls.bedragInkomstenIB2.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when bedragInkomstenIB2 is filled incorrectly', () => {
                            form.controls.bedragInkomstenIB2.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });

                    describe('; indicatieAangifteIB2: nee', () => {
                        beforeEach(() => {
                            form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
                        });

                        it('should be invalid', () => {
                            expect(form.invalid).toBe(true);
                        });

                        it('should be valid when schattingInkomsten is filled correctly', () => {
                            form.controls.schattingInkomsten.setValue(42);
                            expect(form.valid).toBe(true);
                        });

                        it('should be invalid when schattingInkomsten is filled incorrectly', () => {
                            form.controls.schattingInkomsten.setValue('fortytwo');
                            expect(form.invalid).toBe(true);
                        });
                    });
                });
            });
        });
    });
});
